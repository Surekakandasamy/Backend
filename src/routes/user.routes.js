const express = require('express');
const { getUsers, createUser, getProfile, updateProfile, deleteUser } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/:id', deleteUser);

module.exports = router;