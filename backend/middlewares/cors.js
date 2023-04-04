const allowedCors = [
  'http://bekend-mesto-api.nomoredomains.monster',
  'https://bekend-mesto-api.nomoredomains.monster',
  'https://bekend-mesto.nomoredomains.monster',
  'https://bekend-mesto.nomoredomains.monster',
  'localhost:3001',
  'localhost:3001',
  'localhost:3000',
  'localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-type', 'origin', 'Authorization'],
  preflightContinue: false,
};

module.exports = corsOptions;