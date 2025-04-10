const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/search', studentController.searchStudents);
router.get('/roll/:roll', studentController.getStudentByRoll);

// Protected routes (admin only)
router.get('/', isAuthenticated, isAdmin, studentController.getAllStudents);
router.get('/:id', isAuthenticated, isAdmin, studentController.getStudentById);
router.post('/', isAuthenticated, isAdmin, studentController.createStudent);
router.put('/:id', isAuthenticated, isAdmin, studentController.updateStudent);
router.delete('/:id', isAuthenticated, isAdmin, studentController.deleteStudent);

module.exports = router;
