const router = require('express').Router();
const { NotFound } = require('../errors/index');

router.use(() => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
