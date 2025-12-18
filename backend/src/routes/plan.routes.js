const express = require('express');
const { getPlans, getPlanById, createPlan, updatePlan, deletePlan } = require('../controllers/plan.controller');

const router = express.Router();

router.get('/', getPlans);
router.get('/:id', getPlanById);
router.post('/', createPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

module.exports = router;