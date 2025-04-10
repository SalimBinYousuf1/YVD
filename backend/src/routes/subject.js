const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);

// Protected routes (admin only)
router.post('/', isAuthenticated, isAdmin, subjectController.createSubject);
router.put('/:id', isAuthenticated, isAdmin, subjectController.updateSubject);
router.delete('/:id', isAuthenticated, isAdmin, subjectController.deleteSubject);

module.exports = router;
