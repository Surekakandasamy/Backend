const Payment = require('../models/Payment');

class PaymentService {
  static async processPayment(userId, transactionId, amount, method) {
    const payment = await Payment.create({
      userId,
      transactionId,
      amount,
      method,
      paymentId: `PAY${Date.now()}`,
      status: 'completed'
    });

    return payment;
  }

  static async getPaymentHistory(userId) {
    return await Payment.find({ userId }).sort({ createdAt: -1 });
  }
}

module.exports = PaymentService;