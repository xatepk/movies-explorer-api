const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const createMovieValidator = require('../middlewares/validators/createMovie');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidator, createMovie);
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
