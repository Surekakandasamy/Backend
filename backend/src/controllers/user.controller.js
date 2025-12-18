const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/response');

const getUsers = async (req, res) => {
  try {
    const { email } = req.query;
    const query = { isActive: true };
    if (email) {
      query.email = email;
    }
    const users = await User.find(query).select('-password');
    successResponse(res, users);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    
    // Build uniqueness conditions
    const uniqueConditions = [{ email }];
    if (phone) {
      uniqueConditions.push({ phone });
    }
    
    // Check if user already exists (by email and, if provided, phone)
    let user = await User.findOne({ $or: uniqueConditions });
    
    if (user) {
      return successResponse(res, user, 'User already exists');
    }
    
    // Create new user
    user = await User.create(req.body);
    const Wallet = require('../models/Wallet');
    await Wallet.create({ userId: user._id, balance: 5000 });
    
    successResponse(res, user, 'User created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true }
    ).select('-password');
    
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getUsers, createUser, getProfile, updateProfile, deleteUser };