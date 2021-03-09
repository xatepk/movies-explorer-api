const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const createMovieValidator = require('../middlewares/validators/createMovie');
const authRouter = require('../middlewares/auth');

router.get('/movies', authRouter, getMovies);
router.post('/movies', authRouter, createMovieValidator, createMovie);
router.delete('/movies/:movieId', authRouter, deleteMovie);

module.exports = router;
