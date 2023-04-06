const router = require('express').Router();

// pr14
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, patchUser, patchAvatar, getInfoUser,
} = require('../controllers/users');

router.get('/', getUsers);

// pr14
router.get('/me', getInfoUser);
// pr14

router.get('/:userId', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), patchAvatar);

module.exports = router;
