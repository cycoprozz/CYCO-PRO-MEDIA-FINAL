const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { faunaClient, q } = require('./utils/fauna');
const { isDemo, getDemoGalleryIdForEmail } = require('./utils/demo-data');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email } = body;
  const emailTrimmed = (email || '').trim();
  if (!emailTrimmed) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email required' }) };
  }

  if (isDemo()) {
    const galleryId = getDemoGalleryIdForEmail(emailTrimmed);
    if (!galleryId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied. Demo: use client@example.com' }) };
    }
    const token = jwt.sign(
      { email: emailTrimmed, galleryId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long'
    );
    const host = event.headers['x-forwarded-host'] || event.headers.host || 'localhost:8888';
    const base = process.env.URL || (host.includes('localhost') ? `http://${host}` : `https://${host}`);
    const magicLink = `${base}/.netlify/functions/auth-verify?token=${token}`;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Magic link ready', magicLink })
    };
  }

  try {
    const accessList = await faunaClient.query(
      q.Paginate(q.Match(q.Index('access_by_email'), emailTrimmed))
    );

    if (!accessList?.data?.length) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied' }) };
    }

    const firstRef = accessList.data[0];
    const accessDoc = await faunaClient.query(q.Get(firstRef));
    const galleryId = accessDoc.data?.galleryId;
    if (!galleryId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied' }) };
    }

    const token = jwt.sign(
      { email: emailTrimmed, galleryId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.JWT_SECRET
    );

    const magicLink = `${process.env.URL || 'https://localhost:8888'}/.netlify/functions/auth-verify?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"LUMINA Photography" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Gallery Access Link',
      html: `
        <div style="font-family: 'Cormorant Garamond', serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #0a0a0a; color: #fafafa;">
          <h1 style="font-weight: 300; font-size: 48px; margin-bottom: 10px;">LUMINA</h1>
          <p style="color: #d4af37; text-transform: uppercase; letter-spacing: 3px; font-size: 12px; margin-bottom: 40px;">Client Portal</p>
          <p style="font-family: 'Inter', sans-serif; line-height: 1.6; margin-bottom: 30px;">
            Your private gallery is ready. Click the button below to access your images.
          </p>
          <a href="${magicLink}" style="display: inline-block; background: #d4af37; color: #000; padding: 16px 32px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; font-weight: 600; margin-bottom: 30px;">
            Access Gallery
          </a>
          <p style="font-family: 'Inter', sans-serif; font-size: 12px; color: #666;">
            This link expires in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      `
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Magic link sent' })
    };
  } catch (err) {
    if (err.name === 'NotFound') {
      return { statusCode: 403, body: JSON.stringify({ error: 'Access denied' }) };
    }
    console.error('Auth error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
