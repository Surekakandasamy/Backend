const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { successResponse, errorResponse } = require('../utils/response');

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalRevenue = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const data = {
      totalUsers,
      totalTransactions,
      totalRevenue: totalRevenue[0]?.total || 0
    };

    successResponse(res, data);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getDashboard };