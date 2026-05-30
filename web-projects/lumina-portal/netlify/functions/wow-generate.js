const sharp = require('sharp');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { getGalleryByCode } = require('./utils/fauna');
const { isDemo, getDemoGallery } = require('./utils/demo-data');

const JWT_SECRET = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';

const TEMPLATES = {
  billboard: {
    width: 1920,
    height: 1080,
    overlayUrl: process.env.WOW_OVERLAY_BILLBOARD,
    processing: (img) =>
      img
        .resize(1200, 675, { fit: 'cover' })
        .modulate({ brightness: 1.1 })
        .blur(0.5)
  },
  magazine: {
    width: 1920,
    height: 1080,
    overlayUrl: process.env.WOW_OVERLAY_MAGAZINE,
    processing: (img) => img.resize(800, 1000, { fit: 'cover' })
  },
  gallery: {
    width: 1920,
    height: 1080,
    overlayUrl: process.env.WOW_OVERLAY_GALLERY,
    processing: (img) =>
      img
        .resize(1000, 1333, { fit: 'inside' })
        .flatten({ background: { r: 26, g: 26, b: 26 } })
  },
  penthouse: {
    width: 1920,
    height: 1080,
    overlayUrl: process.env.WOW_OVERLAY_PENTHOUSE,
    processing: (img) => img.resize(600, 800, { fit: 'cover' })
  }
};

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

  const { imageId, template } = body;

  if (!TEMPLATES[template]) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid template' }) };
  }

  try {
    const decoded = jwt.verify(session, JWT_SECRET);

    let galleryDoc;
    if (isDemo()) {
      galleryDoc = getDemoGallery(decoded.galleryId);
      if (!galleryDoc) return { statusCode: 404, body: JSON.stringify({ error: 'Gallery not found' }) };
    } else {
      galleryDoc = await getGalleryByCode(decoded.galleryId);
    }
    const images = galleryDoc.data.images || [];
    const image = images.find((i) => (i.id || '') === imageId) || images[Number(imageId)];
    const imageUrl = image?.urlHighRes || image?.url;

    if (!imageUrl) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Image not found' }) };
    }

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const templateConfig = TEMPLATES[template];
    let processedImage = await templateConfig.processing(sharp(imageBuffer)).toBuffer();

    let finalBuffer = processedImage;
    if (templateConfig.overlayUrl) {
      const overlayRes = await fetch(templateConfig.overlayUrl);
      if (overlayRes.ok) {
        const overlayBuf = Buffer.from(await overlayRes.arrayBuffer());
        finalBuffer = await sharp(overlayBuf)
          .composite([{ input: processedImage, gravity: 'center' }])
          .jpeg({ quality: 90 })
          .toBuffer();
      }
    }

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_SECRET) {
      const cloudinary = require('cloudinary').v2;
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      const dataUri = `data:image/jpeg;base64,${finalBuffer.toString('base64')}`;
      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataUri, { folder: 'lumina-wow', resource_type: 'image' }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: upload.secure_url, expiresAt })
      };
    }

    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `data:image/jpeg;base64,${finalBuffer.toString('base64')}`,
        expiresAt
      })
    };
  } catch (err) {
    console.error('Wow generate error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Generation failed' }) };
  }
};
