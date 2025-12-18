const Transaction = require('../models/Transaction');
const User = require('../models/User');

class AnalyticsService {
  static async getDashboardStats() {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    
    const revenueData = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyRevenue = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    return {
      totalUsers,
      totalTransactions,
      totalRevenue: revenueData[0]?.total || 0,
      monthlyRevenue
    };
  }
}

module.exports = AnalyticsService;