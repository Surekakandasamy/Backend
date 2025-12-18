const { generateToken } = require('../config/jwt');

const createToken = (userId) => {
  return generateToken({ id: userId });
};

module.exports = createToken;