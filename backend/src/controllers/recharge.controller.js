const Transaction = require('../models/Transaction');
const Plan = require('../models/Plan');
const Wallet = require('../models/Wallet');
const { successResponse, errorResponse } = require('../utils/response');

const processRecharge = async (req, res) => {
  try {
    const { phoneNumber, planId } = req.body;
    
    const plan = await Plan.findById(planId);
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }

    const wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet || wallet.balance < plan.price) {
      return errorResponse(res, 'Insufficient balance', 400);
    }

    const transaction = await Transaction.create({
      userId: req.user._id,
      type: 'recharge',
      amount: plan.price,
      planId,
      phoneNumber,
      referenceId: `TXN${Date.now()}`,
      status: 'completed'
    });

    wallet.balance -= plan.price;
    await wallet.save();

    successResponse(res, transaction, 'Recharge successful');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { processRecharge };