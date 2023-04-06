const error = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 && 'На сервере произошла ошибка';

  res.status(statusCode).send({ message, statusCode });

  next();
};

module.exports = error;
