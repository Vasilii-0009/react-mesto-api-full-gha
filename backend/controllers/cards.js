const Card = require('../models/card');
const { StatusOk, StatusOkCreat } = require('../utils/variables');

// pr14
const NotFoundError = require('../utils/not-found-err');
const ValidationError = require('../utils/validation-err');
const ForbiddenError = require('../utils/forbidden-err');

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner,
  })
    .then((card) => res.status(StatusOkCreat).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поля заполнины не коректно'));
      }
      return next(err);
    });
}

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => {
      res.status(StatusOk).send(cards);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null || !card) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      const paramsId = req.user._id.toString();
      const cardId = card.owner.toString();

      if (paramsId === cardId) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => {
            const result = res.send({ data: removedCard });
            return result;
          });
      } else {
        return next(new ForbiddenError('У вас нет прав для удаления данной карточки'));
      }
      return (Card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя.(то есть некоректный id)'));
      }
      return next(err);
    });
}

function putCardLikes(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((putLikes) => {
      if (putLikes !== null) {
        const result = res.status(StatusOk).send(putLikes);
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

function putDeleteLikes(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((deletelikes) => {
      if (deletelikes !== null) {
        const result = res.status(StatusOk).send(deletelikes);
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

module.exports = {
  createCard, getCards, deleteCard, putCardLikes, putDeleteLikes,
};
