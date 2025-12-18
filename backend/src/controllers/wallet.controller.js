const Wallet = require('../models/Wallet');
const { successResponse, errorResponse } = require('../utils/response');

const getBalance = async (req, res) => {
  try {
    const User = require('../models/User');
    const defaultUser = await User.findOne({ role: 'user' });
    const userId = req.user?._id || defaultUser._id;
    
    const wallet = await Wallet.findOne({ userId });
    successResponse(res, { balance: wallet?.balance || 0 });
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const topupWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    const User = require('../models/User');
    const defaultUser = await User.findOne({ role: 'user' });
    const userId = req.user?._id || defaultUser._id;
    
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: Math.max(0, amount) });
    } else {
      wallet.balance = Math.max(0, wallet.balance + amount);
      await wallet.save();
    }

    const message = amount > 0 ? 'Wallet topped up successfully' : 'Amount deducted successfully';
    successResponse(res, { balance: wallet.balance }, message);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getBalance, topupWallet };