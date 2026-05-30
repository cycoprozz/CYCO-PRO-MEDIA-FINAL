const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { faunaClient, q, getGalleryByCode } = require('./utils/fauna');
const { isDemo, getDemoGallery, getDemoFavorites } = require('./utils/demo-data');

function getGalleryIdFromPath(path) {
  if (!path) return null;
  const parts = path.split('/').filter(Boolean);
  const fnIdx = parts.indexOf('gallery-get');
  if (fnIdx !== -1 && parts[fnIdx + 1]) return parts[fnIdx + 1];
  return null;
}

exports.handler = async (event) => {
  const galleryId = event.queryStringParameters?.galleryId || getGalleryIdFromPath(event.path);

  if (!galleryId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Gallery ID required' }) };
  }

  const cookies = cookie.parse(event.headers.cookie || '');
  const session = cookies.session;

  if (!session) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  const jwtSecret = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';

  try {
    const decoded = jwt.verify(session, jwtSecret);

    if (decoded.galleryId !== galleryId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied' }) };
    }

    if (isDemo()) {
      const galleryDoc = getDemoGallery(galleryId);
      if (!galleryDoc) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Gallery not found' }) };
      }
      const galleryData = galleryDoc.data;
      const favorites = getDemoFavorites(decoded.email, galleryId);
      const gallery = {
        id: galleryId,
        code: galleryData.code,
        title: galleryData.title,
        category: galleryData.category,
        date: galleryData.date,
        location: galleryData.location,
        expiresAt: galleryData.expiresAt,
        images: (galleryData.images || []).map((img) => ({
          id: img.id,
          url: img.url,
          title: img.title || '',
          meta: img.meta || ''
        }))
      };
      return {
        statusCode: 200,
        headers: { 'Cache-Control': 'private, max-age=60', 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery, favorites, user: { email: decoded.email } })
      };
    }

    const galleryDoc = await getGalleryByCode(galleryId);
    const galleryData = galleryDoc.data;
    const galleryRef = galleryDoc.ref;

    const favoritesResult = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('favorites_by_user_gallery'), decoded.email, galleryId)),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );

    const favorites = (favoritesResult.data || []).map((f) => f.data?.imageId).filter(Boolean);

    const gallery = {
      id: galleryId,
      code: galleryData.code,
      title: galleryData.title,
      category: galleryData.category,
      date: galleryData.date,
      location: galleryData.location,
      expiresAt: galleryData.expiresAt,
      images: (galleryData.images || []).map((img, i) => ({
        id: img.id || galleryRef.id + '-img-' + i,
        url: img.url,
        title: img.title || '',
        meta: img.meta || ''
      }))
    };

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'private, max-age=60',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gallery,
        favorites,
        user: { email: decoded.email }
      })
    };
  } catch (err) {
    if (err.name === 'NotFound') {
      return { statusCode: 404, body: JSON.stringify({ error: 'Gallery not found' }) };
    }
    if (err.name === 'JsonWebTokenError') {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid session' }) };
    }
    console.error('Gallery fetch error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
