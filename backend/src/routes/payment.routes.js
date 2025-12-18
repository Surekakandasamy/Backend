const express = require('express');
const { getPayments, createPayment } = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getPayments);
router.post('/', createPayment);

module.exports = router;