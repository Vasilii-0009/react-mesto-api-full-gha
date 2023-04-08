const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// pr14
const erro = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

app.use('*', cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb', {});
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(erro);
app.listen(PORT, () => {

});
