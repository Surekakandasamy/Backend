const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const Plan = require('../models/Plan');

class RechargeService {
  static async processRecharge(userId, phoneNumber, planId) {
    const plan = await Plan.findById(planId);
    if (!plan) throw new Error('Plan not found');

    const wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balance < plan.price) {
      throw new Error('Insufficient balance');
    }

    const transaction = await Transaction.create({
      userId,
      type: 'recharge',
      amount: plan.price,
      planId,
      phoneNumber,
      referenceId: `TXN${Date.now()}`,
      status: 'completed'
    });

    wallet.balance -= plan.price;
    await wallet.save();

    return transaction;
  }
}

module.exports = RechargeService;