const express = require('express');
const { getDashboard } = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminRequired } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(adminRequired);

// Admin only endpoints
router.get('/dashboard', getDashboard);
router.post('/plans', (req, res) => res.json({ message: 'Create plan' }));
router.put('/plans/:id', (req, res) => res.json({ message: 'Update plan' }));
router.delete('/plans/:id', (req, res) => res.json({ message: 'Delete plan' }));
router.post('/offers', (req, res) => res.json({ message: 'Create offer' }));
router.get('/users', (req, res) => res.json({ message: 'Get all users' }));
router.get('/transactions', (req, res) => res.json({ message: 'Get all transactions' }));

module.exports = router;