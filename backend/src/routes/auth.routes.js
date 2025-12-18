const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../utils/validators');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

module.exports = router;