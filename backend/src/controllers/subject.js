const { getAllRows, getRow, runQuery } = require('../config/database');

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await getAllRows('SELECT * FROM subjects ORDER BY name');
    
    return res.json({
      success: true,
      count: subjects.length,
      subjects
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get subjects',
      error: error.message
    });
  }
};

// Get subject by ID
const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subject = await getRow('SELECT * FROM subjects WHERE id = ?', [id]);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    return res.json({
      success: true,
      subject
    });
  } catch (error) {
    console.error('Get subject error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get subject',
      error: error.message
    });
  }
};

// Create new subject
const createSubject = async (req, res) => {
  try {
    const { name, code, full_marks, pass_marks, class: subjectClass } = req.body;
    
    // Validate input
    if (!name || !code || !subjectClass) {
      return res.status(400).json({
        success: false,
        message: 'Name, code, and class are required'
      });
    }
    
    // Check if code already exists
    const existingSubject = await getRow('SELECT * FROM subjects WHERE code = ?', [code]);
    
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: 'Subject code already exists'
      });
    }
    
    // Create new subject
    const result = await runQuery(
      'INSERT INTO subjects (name, code, full_marks, pass_marks, class) VALUES (?, ?, ?, ?, ?)',
      [name, code, full_marks || 100, pass_marks || 33, subjectClass]
    );
    
    return res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      subjectId: result.lastID
    });
  } catch (error) {
    console.error('Create subject error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create subject',
      error: error.message
    });
  }
};

// Update subject
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, full_marks, pass_marks, class: subjectClass } = req.body;
    
    // Validate input
    if (!name || !code || !subjectClass) {
      return res.status(400).json({
        success: false,
        message: 'Name, code, and class are required'
      });
    }
    
    // Check if subject exists
    const subject = await getRow('SELECT * FROM subjects WHERE id = ?', [id]);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    // Check if code already exists for another subject
    if (code !== subject.code) {
      const existingSubject = await getRow('SELECT * FROM subjects WHERE code = ?', [code]);
      
      if (existingSubject) {
        return res.status(400).json({
          success: false,
          message: 'Subject code already exists'
        });
      }
    }
    
    // Update subject
    await runQuery(
      'UPDATE subjects SET name = ?, code = ?, full_marks = ?, pass_marks = ?, class = ? WHERE id = ?',
      [name, code, full_marks || 100, pass_marks || 33, subjectClass, id]
    );
    
    return res.json({
      success: true,
      message: 'Subject updated successfully'
    });
  } catch (error) {
    console.error('Update subject error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update subject',
      error: error.message
    });
  }
};

// Delete subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if subject exists
    const subject = await getRow('SELECT * FROM subjects WHERE id = ?', [id]);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    // Delete subject
    await runQuery('DELETE FROM subjects WHERE id = ?', [id]);
    
    return res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete subject',
      error: error.message
    });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};
