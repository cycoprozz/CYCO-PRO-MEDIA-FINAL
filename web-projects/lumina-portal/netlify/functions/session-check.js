const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookies = cookie.parse(event.headers.cookie || '');
  const session = cookies.session;

  if (!session) {
    return { statusCode: 401, body: JSON.stringify({ error: 'No session' }) };
  }

  try {
    const decoded = jwt.verify(session, JWT_SECRET);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        galleryId: decoded.galleryId,
        email: decoded.email
      })
    };
  } catch (err) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid session' }) };
  }
};
