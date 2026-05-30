const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const archiver = require('archiver');
const fetch = require('node-fetch');
const { faunaClient, q, getGalleryByCode } = require('./utils/fauna');
const { isDemo, getDemoGallery } = require('./utils/demo-data');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookies = cookie.parse(event.headers.cookie || '');
  const session = cookies.session;

  if (!session) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { imageIds, quality = 'web', galleryId } = body;

  if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'imageIds array required' }) };
  }

  try {
    const decoded = jwt.verify(session, JWT_SECRET);
    const code = galleryId || decoded.galleryId;

    let galleryDoc;
    if (isDemo()) {
      galleryDoc = getDemoGallery(code);
      if (!galleryDoc) throw new Error('Gallery not found');
    } else {
      galleryDoc = await getGalleryByCode(code);
    }
    const galleryData = galleryDoc.data;
    const images = galleryData.images || [];
    const refId = galleryDoc.ref?.id || code;
    const imageMap = new Map(images.map((img, i) => [img.id || refId + '-img-' + i, img]));

    const toDownload = imageIds
      .map((id) => {
        const img = imageMap.get(id);
        if (!img) return null;
        const url = quality === 'print' ? img.urlPrint || img.url : img.urlWeb || img.url;
        const filename = (img.filename || img.title || id) + (url.match(/\.(jpg|jpeg|png|webp)/i) ? '' : '.jpg');
        return { url, filename };
      })
      .filter(Boolean);

    if (toDownload.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No valid images to download' }) };
    }

    const archive = archiver('zip', { zlib: { level: 9 } });
    const chunks = [];

    archive.on('data', (chunk) => chunks.push(chunk));

    for (const img of toDownload) {
      const response = await fetch(img.url);
      if (!response.ok) continue;
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      archive.append(buffer, { name: img.filename });
    }

    await archive.finalize();
    await new Promise((resolve, reject) => {
      archive.on('end', resolve);
      archive.on('error', reject);
    });

    const zipBuffer = Buffer.concat(chunks);

    if (!isDemo()) {
      await faunaClient.query(
        q.Create(q.Collection('downloads'), {
          data: {
            userEmail: decoded.email,
            galleryId: code,
            imageCount: toDownload.length,
            quality,
            createdAt: q.Now()
          }
        })
      ).catch(() => {});
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="lumina-gallery-${Date.now()}.zip"`,
        'Content-Length': String(zipBuffer.length)
      },
      body: zipBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error('Download error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Download failed' }) };
  }
};
