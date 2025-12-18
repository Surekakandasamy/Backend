const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['upi', 'card', 'netbanking', 'wallet'], required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  paymentGatewayId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);