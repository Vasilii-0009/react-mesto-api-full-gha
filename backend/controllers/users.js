const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// pr14
const NotFoundError = require('../utils/not-found-err');
const ValidationError = require('../utils/validation-err');
const DublicatError = require('../utils/duplicate-err');
const UnauthorizedError = require('../utils/unauthorized-err');

const { StatusOk, StatusOkCreat } = require('../utils/statusCode');

const { NODE_ENV, JWT_SECRET } = require('../config');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.status(StatusOk).send({ users }))
    .catch(next);
}

function getUser(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user !== null) {
        const result = res.status(StatusOk).send({ data: user });
        return result;
      }
      return next(new NotFoundError('Пользователь по указанному _id не найден'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя.(то есть некоректный id)'));
      }
      return next(err);
    });
}

function patchUser(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((newUser) => {
      if (newUser) {
        const result = res.status(StatusOk).send(newUser);
        return result;
      }
      return next(new NotFoundError('Пользователь по указанному _id не найден'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поля заполнины не коректно'));
      }
      return next(err);
    });
}

function patchAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      if (newAvatar) {
        const result = res.status(StatusOk).send(newAvatar);
        return result;
      }
      return next(new NotFoundError('Пользователь по указанному _id не найден'));
    })
    .catch(next);
}

// pr14
function creatUser(req, res, next) {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(StatusOkCreat).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поля заполнины не коректно'));
      }
      if (err.code === 11000) {
        return next(new DublicatError('Пользователь с такими данными уже существует'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильные почта или пароль '));
      }

      return bcrypt.compare(password, user.password)

        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
            res.send({ token });
          }
          return next(new UnauthorizedError('Неправильные почта или пароль '));
        });
    })
    .catch(next);
}

function getInfoUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
}

module.exports = {
  getUsers, getUser, patchUser, patchAvatar, creatUser, login, getInfoUser,
};
