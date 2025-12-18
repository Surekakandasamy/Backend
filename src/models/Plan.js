const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  operator: { type: String, required: true, enum: ['Airtel', 'Jio', 'Vi', 'BSNL'] },
  price: { type: Number, required: true },
  validity: { type: String, required: true },
  data: { type: String, required: true },
  benefits: { type: String },
  category: { type: String, enum: ['unlimited', 'data', 'talktime', 'long-term', 'special', 'international'], default: 'unlimited' },
  popular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);