const router = require('express').Router();
const authRouter = require('../middlewares/auth');
const notFound = require('./notFound');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { registerValidator, loginValidator } = require('../middlewares/validators/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);
router.all('/signin', notFound);
router.all('/signup', notFound);

router.use(authRouter);

router.use('/', usersRoutes);
router.use('/', moviesRoutes);
router.use('/', notFound);

module.exports = router;
