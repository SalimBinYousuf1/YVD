const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Protected routes (admin only)
router.post('/results', 
  isAuthenticated, 
  isAdmin, 
  uploadController.upload.single('file'), 
  uploadController.uploadResults
);

module.exports = router;
