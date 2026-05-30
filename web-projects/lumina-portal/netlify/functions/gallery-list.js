const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getGalleryByCode } = require('./utils/fauna');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const cookies = cookie.parse(event.headers.cookie || '');
  const session = cookies.session;

  if (!session) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const decoded = jwt.verify(session, process.env.JWT_SECRET);
    const code = decoded.galleryId;

    const doc = await getGalleryByCode(code);
    const galleries = [
      {
        id: code,
        code: doc.data.code,
        title: doc.data.title,
        category: doc.data.category,
        date: doc.data.date,
        cover: doc.data.cover,
        expiresAt: doc.data.expiresAt
      }
    ];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ galleries })
    };
  } catch (err) {
    if (err.name === 'NotFound') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ galleries: [] })
      };
    }
    console.error('Gallery list error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
