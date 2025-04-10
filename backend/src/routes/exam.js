const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);

// Protected routes (admin only)
router.post('/', isAuthenticated, isAdmin, examController.createExam);
router.put('/:id', isAuthenticated, isAdmin, examController.updateExam);
router.delete('/:id', isAuthenticated, isAdmin, examController.deleteExam);

module.exports = router;
