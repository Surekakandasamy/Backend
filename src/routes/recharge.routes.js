const express = require('express');
const { processRecharge } = require('../controllers/recharge.controller');
const { rechargeValidation } = require('../utils/validators');
const validate = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', rechargeValidation, validate, processRecharge);

module.exports = router;