/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const { NotFound } = require('./errors/index');

const app = express();
const { PORT = 3000 } = process.env;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', usersRoutes);
app.use('/', moviesRoutes);
app.use(() => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorHandler);

app.listen(PORT, () => {
});
