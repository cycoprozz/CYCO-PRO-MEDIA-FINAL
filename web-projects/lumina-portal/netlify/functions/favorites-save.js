const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { v4: uuidv4 } = require('uuid');
const { faunaClient, q } = require('./utils/fauna');
const { isDemo, addDemoFavorite, removeDemoFavorite } = require('./utils/demo-data');

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

  const { imageId, action, galleryId } = body;
  if (!imageId || !action || !galleryId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'imageId, action, and galleryId required' }) };
  }

  const jwtSecret = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';

  try {
    const decoded = jwt.verify(session, jwtSecret);

    if (isDemo()) {
      if (action === 'add') {
        addDemoFavorite(decoded.email, galleryId, imageId);
      } else if (action === 'remove') {
        removeDemoFavorite(decoded.email, galleryId, imageId);
      } else {
        return { statusCode: 400, body: JSON.stringify({ error: 'Action must be add or remove' }) };
      }
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    }

    if (action === 'add') {
      const existing = await faunaClient.query(
        q.Count(q.Match(q.Index('favorites_by_user_gallery'), decoded.email, galleryId))
      );

      if (existing >= 50) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Maximum 50 favorites allowed' }) };
      }

      await faunaClient.query(
        q.Create(q.Collection('favorites'), {
          data: {
            id: uuidv4(),
            userEmail: decoded.email,
            galleryId,
            imageId,
            createdAt: q.Now()
          }
        })
      );
    } else if (action === 'remove') {
      const match = await faunaClient.query(
        q.Paginate(q.Match(q.Index('favorite_by_user_image'), decoded.email, imageId))
      );
      if (match.data && match.data.length > 0) {
        await faunaClient.query(q.Delete(match.data[0]));
      }
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Action must be add or remove' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error('Favorites error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
