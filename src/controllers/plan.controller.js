const Plan = require('../models/Plan');
const { successResponse, errorResponse } = require('../utils/response');

const getPlans = async (req, res) => {
  try {
    const { category, operator } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;
    if (operator) filter.operator = operator;

    const plans = await Plan.find(filter).sort({ popular: -1, price: 1 });
    successResponse(res, plans);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    successResponse(res, plan);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    successResponse(res, plan, 'Plan created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    successResponse(res, plan, 'Plan updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!plan) {
      return errorResponse(res, 'Plan not found', 404);
    }
    successResponse(res, null, 'Plan deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getPlans, getPlanById, createPlan, updatePlan, deletePlan };