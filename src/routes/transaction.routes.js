const express = require('express');
const { getTransactions, createTransaction, getTransactionById, deleteAllTransactions } = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/', deleteAllTransactions);
router.get('/:id', authMiddleware, getTransactionById);

module.exports = router;