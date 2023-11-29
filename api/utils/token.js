const jwt = require('jsonwebtoken');
const { JWT_SIGN_SECRET } = require('../config');

/**
 * Currently all tokens have a fixed date.
 * They are only used to create invite links
 *
 * Currently just signing with default RSA SHA256
 */
const generateToken = async (payload) => {
  return await jwt.sign(payload, JWT_SIGN_SECRET, {
    expiresIn: '12h',
  });
};

const decodeToken = async (token) => {
  jwt.verify(token, JWT_SIGN_SECRET, (error, decoded) => {
    if (error) {
      console.error(`error decoding token ${token}. Error: ${error}`);
      return error;
    }
    return decoded;
  });
};

module.exports = {
  generateToken,
  decodeToken,
};
