const { body } = require('express-validator');

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const rechargeValidation = [
  body('phoneNumber').isMobilePhone().withMessage('Valid phone number is required'),
  body('planId').isMongoId().withMessage('Valid plan ID is required')
];

module.exports = { registerValidation, loginValidation, rechargeValidation };