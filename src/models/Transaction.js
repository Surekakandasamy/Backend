const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['recharge', 'wallet_topup', 'refund'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  description: { type: String },
  referenceId: { type: String, unique: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  phoneNumber: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);