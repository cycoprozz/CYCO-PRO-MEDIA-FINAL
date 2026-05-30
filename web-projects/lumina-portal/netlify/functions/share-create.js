const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { v4: uuidv4 } = require('uuid');
const { faunaClient, q } = require('./utils/fauna');
const { isDemo } = require('./utils/demo-data');

const SHARE_EXPIRY_HOURS = 72;
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

  const { galleryId, expiresInHours } = body;
  const code = galleryId;

  if (!code) {
    return { statusCode: 400, body: JSON.stringify({ error: 'galleryId required' }) };
  }

  try {
    const decoded = jwt.verify(session, JWT_SECRET);
    if (decoded.galleryId !== code) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied' }) };
    }

    const shareId = uuidv4();
    const expiresAt = Date.now() + (expiresInHours || SHARE_EXPIRY_HOURS) * 60 * 60 * 1000;

    if (!isDemo()) {
      await faunaClient.query(
        q.Create(q.Collection('shares'), {
          data: {
            id: shareId,
            galleryId: code,
            createdBy: decoded.email,
            expiresAt: new Date(expiresAt).toISOString(),
            createdAt: q.Now()
          }
        })
      );
    }

    const baseUrl = process.env.URL || 'http://localhost:8888';
    const shareUrl = `${baseUrl}/gallery/${code}?share=${shareId}`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shareUrl,
        shareId,
        expiresAt
      })
    };
  } catch (err) {
    console.error('Share create error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
