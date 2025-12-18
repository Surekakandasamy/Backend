const Transaction = require('../models/Transaction');
const { successResponse, errorResponse } = require('../utils/response');

const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, userId } = req.query;
    const filter = {};
    
    if (userId) {
      const mongoose = require('mongoose');
      filter.userId = new mongoose.Types.ObjectId(userId);
    }
    
    const transactions = await Transaction.find(filter)
      .populate('planId', 'name price')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    successResponse(res, transactions);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createTransaction = async (req, res) => {
  try {
    const transactionData = {
      ...req.body,
      referenceId: `TXN${Date.now()}`
    };
    
    const transaction = await Transaction.create(transactionData);
    successResponse(res, transaction, 'Transaction created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('planId');

    if (!transaction) {
      return errorResponse(res, 'Transaction not found', 404);
    }

    successResponse(res, transaction);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deleteAllTransactions = async (req, res) => {
  try {
    await Transaction.deleteMany({});
    successResponse(res, null, 'All transactions deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getTransactions, createTransaction, getTransactionById, deleteAllTransactions };