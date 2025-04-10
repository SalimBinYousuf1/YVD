const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/student/:roll/exam/:examId', resultController.getResultsByRollAndExam);

// Protected routes (admin only)
router.get('/', isAuthenticated, isAdmin, resultController.getAllResults);
router.get('/student/:studentId/exam/:examId', isAuthenticated, isAdmin, resultController.getResultsByStudentAndExam);
router.post('/', isAuthenticated, isAdmin, resultController.createResult);
router.put('/:id', isAuthenticated, isAdmin, resultController.updateResult);
router.delete('/:id', isAuthenticated, isAdmin, resultController.deleteResult);

module.exports = router;
