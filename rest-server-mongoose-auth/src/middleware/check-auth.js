const base64 = require('base-64');
const checkAuth = (request, response, next) => {
  const token = request.headers.authorization;
  const cookie = request.get('Cookie');
  const notSecureData = token ? base64.decode(token.substring(6)) : null;
  response.setHeader('Set-Cookie', 'loggedIn=false');
  if (/ZG0xMjQ6bm90VzM0a1BAc3M=/.test(token)) {
    response.setHeader('Set-Cookie', 'loggedIn=true')
    next();
  } else {
    const HttpStatusNotAuthorized = 401;
    const errorInfo = {
      status: HttpStatusNotAuthorized,
      message: 'Not authorized'
    };

    response
      .status(HttpStatusNotAuthorized)
      .json(errorInfo);
  }
}

module.exports = checkAuth;