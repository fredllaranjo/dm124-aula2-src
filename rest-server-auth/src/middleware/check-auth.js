const checkAuth = (request, response, next) => {
  const token = request.headers.authorization;
  const cookie = request.get('Cookie');
  if(/ZG0xMjQ6bm90VzM0a1BAc3M=/.test(token)) {
    request.session.isLoggedIn = true;
    response.setHeader('Set-Cookie', 'loggedIn=true');    
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