const jwt = require('jsonwebtoken');
const { Forbidden, Unautorized } = require('../errors/index');
const { JWT_SECRET } = require('../config/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unautorized('Для доступа к запрашиваемому ресурсу требуется аутентификация');
  }
  const token = authorization.replace(/^Bearer /, '');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } catch (err) {
    throw new Forbidden('Отказано в доступе');
  }
  next();
};

module.exports = auth;
