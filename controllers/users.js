const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_TTL } = require('../config/index');
const User = require('../models/user');
const { NotFound, Conflict, Unautorized } = require('../errors/index');
const {
  userNotFound, userUnautorized, userCreate, userConflict,
} = require('../config/constants');

module.exports.getUserInfo = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFound(userNotFound);
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(userNotFound);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unautorized(userUnautorized);
      }

      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new Unautorized(userUnautorized);
        });
    })
    .then(({ _id }) => {
      const token = jwt.sign(
        { _id },
        JWT_SECRET,
        { expiresIn: JWT_TTL },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(userConflict);
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.send({ message: `${userCreate} ${user.email}` }))
    .catch(next);
};
