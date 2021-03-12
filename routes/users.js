const router = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/users');
const userUpdateValidator = require('../middlewares/validators/userUpdate');

router.get('/users/me', getUserInfo);
router.patch('/users/me', userUpdateValidator, updateProfile);

module.exports = router;
