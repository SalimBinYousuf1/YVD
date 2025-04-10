const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/auth');

// Login route
router.post('/login', authController.login);

// Register route
router.post('/register', authController.register);

// Get current user profile
router.get('/profile', isAuthenticated, authController.getProfile);

// Logout route
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;
