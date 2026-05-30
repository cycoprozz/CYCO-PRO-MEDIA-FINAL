const cookie = require('cookie');

exports.handler = async () => {
  const sessionCookie = cookie.serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  });

  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': sessionCookie,
      'Location': '/'
    },
    body: ''
  };
};
