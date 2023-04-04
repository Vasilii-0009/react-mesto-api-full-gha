const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
// const optionsCors = require('./middlewares/cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// pr14
const { creatUser, login } = require('./controllers/users');
const erro = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();
app.use('*', cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});
app.use(requestLogger);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), creatUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(erro);
app.listen(PORT, () => {

});
