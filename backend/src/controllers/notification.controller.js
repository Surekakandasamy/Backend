const Notification = require('../models/Notification');
const { successResponse, errorResponse } = require('../utils/response');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    successResponse(res, notifications);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createNotification = async (req, res) => {
  try {
    const User = require('../models/User');
    const defaultUser = await User.findOne({ role: 'user' });
    
    const notification = await Notification.create({
      ...req.body,
      userId: req.user?._id || defaultUser._id
    });
    successResponse(res, notification, 'Notification created', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    successResponse(res, null, 'Notification marked as read');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getNotifications, createNotification, markAsRead };