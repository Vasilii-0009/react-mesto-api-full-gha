const router = require('express').Router();

// pr14
const { celebrate, Joi } = require('celebrate');
const { RegularForLink } = require('../utils/variables');

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
    avatar: Joi.string().required().pattern(RegularForLink),
  }),
}), patchAvatar);

module.exports = router;
