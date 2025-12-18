const Offer = require('../models/Offer');
const { successResponse, errorResponse } = require('../utils/response');

const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true });
    successResponse(res, offers);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    successResponse(res, offer, 'Offer created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    successResponse(res, offer, 'Offer updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndUpdate(req.params.id, { isActive: false });
    successResponse(res, null, 'Offer deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getOffers, createOffer, updateOffer, deleteOffer };