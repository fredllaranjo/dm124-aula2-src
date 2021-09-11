const bcrypt = require('bcrypt');
const User = require('../models/user');
const encrypt = (request, response, next) => {
  let password = request.body.password;
  let encrypted = bcrypt.hash(password, 12);
  request.body.password = encrypted;
  next();

}

const compare = (request, response, next) => {
  let email = request.body.email;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      notAuthorized(); //Rejeita o login
    }
    bcrypt.compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          request.session.isLoggedIn = true;
          request.session.user = user;
          next() // Login com sucesso
        }
        notAuthorized(); //Rejeita o login
      })
      .catch(err => {
        notAuthorized(); //Rejeita o login
      });
  });
}

const notAuthorized = (response) => {
  const HttpStatusNotAuthorized = 401;
  const errorInfo = {
    status: HttpStatusNotAuthorized,
    message: 'Not authorized'
  };

  response
    .status(HttpStatusNotAuthorized)
    .json(errorInfo);
}
exports.encrypt = encrypt;
exports.compare = compare;