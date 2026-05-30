const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { faunaClient, q } = require('./utils/fauna');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const galleryId = event.queryStringParameters?.galleryId;
  if (!galleryId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'galleryId required' }) };
  }

  const cookies = cookie.parse(event.headers.cookie || '');
  const session = cookies.session;

  if (!session) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const decoded = jwt.verify(session, process.env.JWT_SECRET);
    if (decoded.galleryId !== galleryId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied' }) };
    }

    const result = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('favorites_by_user_gallery'), decoded.email, galleryId)),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );

    const favorites = (result.data || []).map((f) => f.data?.imageId).filter(Boolean);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites })
    };
  } catch (err) {
    console.error('Favorites get error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
