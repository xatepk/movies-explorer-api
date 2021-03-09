const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createMovie = celebrate({
  body: {
    country: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    movieId: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    year: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }).message({
      'any.require': 'Обязательное поле',
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }).message({
      'any.require': 'Обязательное поле',
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }).message({
      'any.require': 'Обязательное поле',
    }),
    nameRU: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.require': 'Обязательное поле',
      }),
  },
});

module.exports = createMovie;
