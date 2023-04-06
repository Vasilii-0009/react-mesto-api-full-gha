require('dotenv').config({ path: './.env' });

const { NODE_ENV } = process.env;
const { JWT_SECRET = 'c6b7c3e2545c4e6926cfa33b4c87a209e285d075cf68347acc647cba83cca7eb' } = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
};
