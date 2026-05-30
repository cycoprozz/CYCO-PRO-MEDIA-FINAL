/**
 * Local dev server: serves dist/ and runs Netlify functions so the app works without netlify-cli.
 * Usage: node server.js   (then open http://localhost:8888)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = Number(process.env.PORT) || 8889;
const DIST = path.join(__dirname, 'dist');
const FUNCTIONS = path.join(__dirname, 'netlify', 'functions');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim();
    });
  }
}

async function invokeFunction(name, event) {
  const modPath = path.join(FUNCTIONS, name + '.js');
  if (!fs.existsSync(modPath)) return { statusCode: 404, body: 'Not Found' };
  const mod = require(modPath);
  if (typeof mod.handler !== 'function') return { statusCode: 500, body: 'No handler' };
  const res = await mod.handler(event, {});
  return res || { statusCode: 500, body: '' };
}

function parsePath(reqPath) {
  const match = reqPath.match(/^\/api\/([^/]+)(?:\/(.*))?$/);
  if (match) return { type: 'api', fn: match[1], rest: match[2] || '' };
  if (reqPath.startsWith('/.netlify/functions/')) {
    const fn = reqPath.replace('/.netlify/functions/', '').split('/')[0];
    return { type: 'api', fn, rest: reqPath.split('/').slice(4).join('/') };
  }
  return { type: 'static', path: reqPath };
}

function serveStatic(reqPath) {
  let filePath = path.join(DIST, reqPath === '/' ? 'index.html' : reqPath);
  if (!filePath.startsWith(DIST)) return null;
  if (!fs.existsSync(filePath)) return null;
  if (fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) return null;
  }
  return filePath;
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const reqPath = parsed.pathname || '/';
  const info = parsePath(reqPath);

  if (info.type === 'api' || (info.type === 'static' && reqPath.startsWith('/.netlify/'))) {
    let fn = info.fn;
    if (reqPath.startsWith('/.netlify/functions/')) fn = reqPath.split('/')[3];
    const body = req.method === 'POST' || req.method === 'PUT' ? await getBody(req) : null;
    const event = {
      httpMethod: req.method,
      path: reqPath,
      queryStringParameters: parsed.query,
      headers: { cookie: req.headers.cookie || '', host: req.headers.host },
      body: body ? JSON.stringify(body) : null,
      rawUrl: req.url
    };
    try {
      const result = await invokeFunction(fn, event);
      res.writeHead(result.statusCode || 200, {
        'Content-Type': result.headers?.['Content-Type'] || 'application/json',
        ...(result.headers?.Location && { Location: result.headers.Location }),
        ...(result.headers?.['Set-Cookie'] && { 'Set-Cookie': result.headers['Set-Cookie'] })
      });
      if (result.statusCode === 302) return res.end();
      res.end(typeof result.body === 'string' ? result.body : JSON.stringify(result.body));
    } catch (e) {
      console.error('Function error:', e);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(e.message) }));
    }
    return;
  }

  let filePath = serveStatic(reqPath);
  if (!filePath) {
    filePath = serveStatic('/index.html');
    if (!filePath) {
      res.writeHead(404);
      return res.end('Not found');
    }
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(filePath));
});

function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

loadEnv();
server.listen(PORT, '0.0.0.0', () => {
  console.log('LUMINA dev server: http://localhost:' + PORT);
  console.log('Also: http://127.0.0.1:' + PORT);
  console.log('Open the site and click Enter to view the gallery');
});
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Port', PORT, 'is in use. Try: PORT=3000 npm run start');
  } else {
    console.error('Server error:', e.message);
  }
  process.exit(1);
});
