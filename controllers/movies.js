const Movie = require('../models/movie');
const { NotFound, Forbidden, Conflict } = require('../errors/index');
const {
  moviesNotFound, moviesConflict, movieNotFound, movieDeleteForbidden, movieDelete,
} = require('../config/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFound(moviesNotFound);
    })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director,
    duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.findOne({ movieId })
    .then((id) => {
      if (id && (id.owner === req.user._id)) {
        throw new Conflict(moviesConflict);
      }
      Movie.create({
        owner: req.user._id,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      })
        .then((movie) => {
          if (!movie) {
            throw new NotFound(moviesNotFound);
          }
          res.send(movie);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => Movie.findById(
  { _id: req.params.movieId },
)
  .orFail(new NotFound(movieNotFound))
  .then((movie) => {
    if (movie.owner.toString() !== req.user._id) {
      throw new Forbidden(movieDeleteForbidden);
    }
    Movie.findOneAndRemove(
      { _id: req.params.movieId },
    )
      .then(() => res.send({ message: movieDelete }))
      .catch(next);
  })
  .catch(next);
