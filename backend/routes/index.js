const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const { creatUser, login } = require('../controllers/users');

const NotFoundError = require('../utils/not-found-err');
const { RegularForLink } = require('../utils/variables');

router.use('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(RegularForLink),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), creatUser);

router.use('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('запрос по несуществующиму адресу'));
});

module.exports = router;
