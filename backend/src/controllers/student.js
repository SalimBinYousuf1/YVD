const { getAllRows, getRow, runQuery } = require('../config/database');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await getAllRows('SELECT * FROM students ORDER BY name');
    
    return res.json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    console.error('Get students error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get students',
      error: error.message
    });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await getRow('SELECT * FROM students WHERE id = ?', [id]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    return res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Get student error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get student',
      error: error.message
    });
  }
};

// Get student by roll number
const getStudentByRoll = async (req, res) => {
  try {
    const { roll } = req.params;
    
    const student = await getRow('SELECT * FROM students WHERE roll_number = ?', [roll]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    return res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Get student by roll error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get student',
      error: error.message
    });
  }
};

// Search students by name
const searchStudents = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name parameter is required'
      });
    }
    
    const students = await getAllRows(
      'SELECT * FROM students WHERE name LIKE ? ORDER BY name',
      [`%${name}%`]
    );
    
    return res.json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    console.error('Search students error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to search students',
      error: error.message
    });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    const { roll_number, name, class: studentClass, section, dob, gender } = req.body;
    
    // Validate input
    if (!roll_number || !name || !studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Roll number, name, and class are required'
      });
    }
    
    // Check if roll number already exists
    const existingStudent = await getRow('SELECT * FROM students WHERE roll_number = ?', [roll_number]);
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Roll number already exists'
      });
    }
    
    // Create new student
    const result = await runQuery(
      'INSERT INTO students (roll_number, name, class, section, dob, gender) VALUES (?, ?, ?, ?, ?, ?)',
      [roll_number, name, studentClass, section, dob, gender]
    );
    
    return res.status(201).json({
      success: true,
      message: 'Student created successfully',
      studentId: result.lastID
    });
  } catch (error) {
    console.error('Create student error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { roll_number, name, class: studentClass, section, dob, gender } = req.body;
    
    // Validate input
    if (!roll_number || !name || !studentClass) {
      return res.status(400).json({
        success: false,
        message: 'Roll number, name, and class are required'
      });
    }
    
    // Check if student exists
    const student = await getRow('SELECT * FROM students WHERE id = ?', [id]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if roll number already exists for another student
    if (roll_number !== student.roll_number) {
      const existingStudent = await getRow('SELECT * FROM students WHERE roll_number = ?', [roll_number]);
      
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Roll number already exists'
        });
      }
    }
    
    // Update student
    await runQuery(
      'UPDATE students SET roll_number = ?, name = ?, class = ?, section = ?, dob = ?, gender = ? WHERE id = ?',
      [roll_number, name, studentClass, section, dob, gender, id]
    );
    
    return res.json({
      success: true,
      message: 'Student updated successfully'
    });
  } catch (error) {
    console.error('Update student error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if student exists
    const student = await getRow('SELECT * FROM students WHERE id = ?', [id]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Delete student
    await runQuery('DELETE FROM students WHERE id = ?', [id]);
    
    return res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  getStudentByRoll,
  searchStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
