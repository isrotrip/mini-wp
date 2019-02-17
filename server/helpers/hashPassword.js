const crypto = require('crypto');
require('dotenv').config();

module.exports = (password) => {
  return crypto
    .createHmac('sha256', process.env.CRYPTO_SALT)
    .update(password)
    .digest('hex');
}