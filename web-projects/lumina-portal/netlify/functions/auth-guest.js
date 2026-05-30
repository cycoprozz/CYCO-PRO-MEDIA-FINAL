const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { DEMO_ACCESS } = require('./utils/demo-data');
const { isDemo } = require('./utils/demo-data');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';
const DEFAULT_GALLERY_ID = process.env.DEFAULT_GALLERY_ID || DEMO_ACCESS.galleryId;

exports.handler = async (event) => {
  const email = isDemo() ? 'guest@lumina.local' : (process.env.GUEST_EMAIL || 'guest@lumina.local');
  const galleryId = DEFAULT_GALLERY_ID;

  const sessionToken = jwt.sign(
    {
      email,
      galleryId,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    },
    JWT_SECRET
  );

  const sessionCookie = cookie.serialize('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/'
  });

  const host = event.headers['x-forwarded-host'] || event.headers.host || 'localhost:8889';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = process.env.URL || `${protocol}://${host}`;
  const location = `${baseUrl.replace(/\/$/, '')}/gallery/${galleryId}`;

  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': sessionCookie,
      'Location': location
    },
    body: ''
  };
};
