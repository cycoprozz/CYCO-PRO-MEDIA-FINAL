const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.handler = async (event) => {
  const { token } = event.queryStringParameters || {};

  if (!token) {
    return {
      statusCode: 302,
      headers: { 'Location': '/?error=missing_token' },
      body: ''
    };
  }

  const jwtSecret = process.env.JWT_SECRET || 'demo-jwt-secret-min-32-characters-long';
  try {
    const decoded = jwt.verify(token, jwtSecret);

    const sessionToken = jwt.sign(
      {
        email: decoded.email,
        galleryId: decoded.galleryId,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
      },
      jwtSecret
    );

    const sessionCookie = cookie.serialize('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });

    const host = event.headers['x-forwarded-host'] || event.headers.host || 'localhost:8888';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.URL || `${protocol}://${host}`;
    const location = `${baseUrl.replace(/\/$/, '')}/gallery/${decoded.galleryId}`;

    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': sessionCookie,
        'Location': location
      },
      body: ''
    };
  } catch (err) {
    return {
      statusCode: 302,
      headers: { 'Location': '/?error=invalid_token' },
      body: ''
    };
  }
};
