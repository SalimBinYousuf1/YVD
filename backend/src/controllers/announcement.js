const { getAllRows, getRow, runQuery } = require('../config/database');

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await getAllRows(
      'SELECT * FROM announcements ORDER BY created_at DESC'
    );
    
    return res.json({
      success: true,
      count: announcements.length,
      announcements
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get announcements',
      error: error.message
    });
  }
};

// Get active announcements
const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await getAllRows(
      'SELECT * FROM announcements WHERE is_active = 1 ORDER BY created_at DESC'
    );
    
    return res.json({
      success: true,
      count: announcements.length,
      announcements
    });
  } catch (error) {
    console.error('Get active announcements error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get active announcements',
      error: error.message
    });
  }
};

// Get announcement by ID
const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await getRow('SELECT * FROM announcements WHERE id = ?', [id]);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }
    
    return res.json({
      success: true,
      announcement
    });
  } catch (error) {
    console.error('Get announcement error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get announcement',
      error: error.message
    });
  }
};

// Create new announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, is_active } = req.body;
    
    // Validate input
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    // Create new announcement
    const result = await runQuery(
      'INSERT INTO announcements (title, content, is_active) VALUES (?, ?, ?)',
      [title, content, is_active === undefined ? 1 : is_active]
    );
    
    return res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      announcementId: result.lastID
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create announcement',
      error: error.message
    });
  }
};

// Update announcement
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, is_active } = req.body;
    
    // Validate input
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    // Check if announcement exists
    const announcement = await getRow('SELECT * FROM announcements WHERE id = ?', [id]);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }
    
    // Update announcement
    await runQuery(
      'UPDATE announcements SET title = ?, content = ?, is_active = ? WHERE id = ?',
      [title, content, is_active === undefined ? announcement.is_active : is_active, id]
    );
    
    return res.json({
      success: true,
      message: 'Announcement updated successfully'
    });
  } catch (error) {
    console.error('Update announcement error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update announcement',
      error: error.message
    });
  }
};

// Delete announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if announcement exists
    const announcement = await getRow('SELECT * FROM announcements WHERE id = ?', [id]);
    
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }
    
    // Delete announcement
    await runQuery('DELETE FROM announcements WHERE id = ?', [id]);
    
    return res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Delete announcement error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete announcement',
      error: error.message
    });
  }
};

module.exports = {
  getAllAnnouncements,
  getActiveAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
