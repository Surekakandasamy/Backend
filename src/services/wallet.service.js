const Wallet = require('../models/Wallet');

class WalletService {
  static async getBalance(userId) {
    const wallet = await Wallet.findOne({ userId });
    return wallet?.balance || 0;
  }

  static async addBalance(userId, amount) {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: amount });
    } else {
      wallet.balance += amount;
      await wallet.save();
    }
    return wallet.balance;
  }

  static async deductBalance(userId, amount) {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }
    
    wallet.balance -= amount;
    await wallet.save();
    return wallet.balance;
  }
}

module.exports = WalletService;