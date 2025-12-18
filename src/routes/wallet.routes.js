const express = require('express');
const { getBalance, topupWallet } = require('../controllers/wallet.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/balance', getBalance);
router.post('/topup', topupWallet);

module.exports = router;