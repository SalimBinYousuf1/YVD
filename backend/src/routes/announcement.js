const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/active', announcementController.getActiveAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);

// Protected routes (admin only)
router.get('/', isAuthenticated, isAdmin, announcementController.getAllAnnouncements);
router.post('/', isAuthenticated, isAdmin, announcementController.createAnnouncement);
router.put('/:id', isAuthenticated, isAdmin, announcementController.updateAnnouncement);
router.delete('/:id', isAuthenticated, isAdmin, announcementController.deleteAnnouncement);

module.exports = router;
