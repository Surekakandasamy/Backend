const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  const expiresIn = '604800'; // 7 days in seconds
  
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };