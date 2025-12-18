const authMiddleware = require('./auth.middleware');

const protectedRoute = (req, res, next) => {
  authMiddleware(req, res, next);
};

module.exports = protectedRoute;