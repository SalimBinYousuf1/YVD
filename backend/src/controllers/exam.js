const { getAllRows, getRow, runQuery } = require('../config/database');

// Get all exams
const getAllExams = async (req, res) => {
  try {
    const exams = await getAllRows('SELECT * FROM exams ORDER BY year DESC, term');
    
    return res.json({
      success: true,
      count: exams.length,
      exams
    });
  } catch (error) {
    console.error('Get exams error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get exams',
      error: error.message
    });
  }
};

// Get exam by ID
const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const exam = await getRow('SELECT * FROM exams WHERE id = ?', [id]);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    return res.json({
      success: true,
      exam
    });
  } catch (error) {
    console.error('Get exam error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get exam',
      error: error.message
    });
  }
};

// Create new exam
const createExam = async (req, res) => {
  try {
    const { name, description, class: examClass, year, term } = req.body;
    
    // Validate input
    if (!name || !examClass || !year || !term) {
      return res.status(400).json({
        success: false,
        message: 'Name, class, year, and term are required'
      });
    }
    
    // Create new exam
    const result = await runQuery(
      'INSERT INTO exams (name, description, class, year, term) VALUES (?, ?, ?, ?, ?)',
      [name, description, examClass, year, term]
    );
    
    return res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      examId: result.lastID
    });
  } catch (error) {
    console.error('Create exam error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create exam',
      error: error.message
    });
  }
};

// Update exam
const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, class: examClass, year, term } = req.body;
    
    // Validate input
    if (!name || !examClass || !year || !term) {
      return res.status(400).json({
        success: false,
        message: 'Name, class, year, and term are required'
      });
    }
    
    // Check if exam exists
    const exam = await getRow('SELECT * FROM exams WHERE id = ?', [id]);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    // Update exam
    await runQuery(
      'UPDATE exams SET name = ?, description = ?, class = ?, year = ?, term = ? WHERE id = ?',
      [name, description, examClass, year, term, id]
    );
    
    return res.json({
      success: true,
      message: 'Exam updated successfully'
    });
  } catch (error) {
    console.error('Update exam error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update exam',
      error: error.message
    });
  }
};

// Delete exam
const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if exam exists
    const exam = await getRow('SELECT * FROM exams WHERE id = ?', [id]);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    // Delete exam
    await runQuery('DELETE FROM exams WHERE id = ?', [id]);
    
    return res.json({
      success: true,
      message: 'Exam deleted successfully'
    });
  } catch (error) {
    console.error('Delete exam error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete exam',
      error: error.message
    });
  }
};

module.exports = {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam
};
