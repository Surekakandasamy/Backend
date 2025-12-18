const mongoose = require('mongoose');

const autoRechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  phoneNumber: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  triggerBalance: { type: Number, required: true },
  lastRecharge: { type: Date },
  nextRecharge: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('AutoRecharge', autoRechargeSchema);