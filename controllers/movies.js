const Movie = require('../models/movie');
const { NotFound, Forbidden, Conflict } = require('../errors/index');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFound('Фильмы не найдены');
    })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director,
    duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.findOne({ movieId })
    .then((id) => {
      if (id) {
        throw new Conflict('Фильм с таким идентификатором уже существует');
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
            throw new NotFound('Фильмы не найдены');
          }
          res.status(200).send(movie);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => Movie.findOneAndDelete(
  { movieId: req.params.movieId },
)
  .orFail(new NotFound('Фильм не найден'))
  .then((movie) => {
    if (movie.owner.toString() !== req.user._id) {
      throw new Forbidden('Нет прав');
    }
    res.status(200).send({ message: 'Фильм удален!' });
  })
  .catch(next);
