const router = require('express').Router();
const { registerValidator, loginValidator } = require('../middlewares/validators/auth');
const {
  createUser, login, getUserInfo, updateProfile,
} = require('../controllers/users');
const authRouter = require('../middlewares/auth');
const userUpdateValidator = require('../middlewares/validators/userUpdate');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);
router.get('/users/me', authRouter, getUserInfo);
router.patch('/users/me', userUpdateValidator, authRouter, updateProfile);

module.exports = router;
