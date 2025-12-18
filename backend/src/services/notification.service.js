const Notification = require('../models/Notification');

class NotificationService {
  static async createNotification(userId, title, message, type = 'info', data = null) {
    return await Notification.create({
      userId,
      title,
      message,
      type,
      data
    });
  }

  static async getUserNotifications(userId) {
    return await Notification.find({ userId }).sort({ createdAt: -1 });
  }

  static async markAsRead(notificationId) {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
  }
}

module.exports = NotificationService;