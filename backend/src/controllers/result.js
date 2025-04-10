const { getAllRows, getRow, runQuery } = require('../config/database');

// Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await getAllRows(`
      SELECT r.*, s.name as student_name, s.roll_number, 
      e.name as exam_name, e.term, e.year, 
      sub.name as subject_name, sub.code as subject_code,
      sub.full_marks, sub.pass_marks
      FROM results r
      JOIN students s ON r.student_id = s.id
      JOIN exams e ON r.exam_id = e.id
      JOIN subjects sub ON r.subject_id = sub.id
      ORDER BY s.roll_number, e.year DESC, e.term, sub.name
    `);
    
    return res.json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Get results error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get results',
      error: error.message
    });
  }
};

// Get results by student ID and exam ID
const getResultsByStudentAndExam = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    
    // Get student details
    const student = await getRow('SELECT * FROM students WHERE id = ?', [studentId]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Get exam details
    const exam = await getRow('SELECT * FROM exams WHERE id = ?', [examId]);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    // Get results
    const results = await getAllRows(`
      SELECT r.*, sub.name as subject_name, sub.code as subject_code,
      sub.full_marks, sub.pass_marks
      FROM results r
      JOIN subjects sub ON r.subject_id = sub.id
      WHERE r.student_id = ? AND r.exam_id = ?
      ORDER BY sub.name
    `, [studentId, examId]);
    
    // Calculate total marks, percentage, and grade
    let totalMarks = 0;
    let totalFullMarks = 0;
    let failedSubjects = 0;
    
    results.forEach(result => {
      totalMarks += result.marks;
      totalFullMarks += result.full_marks;
      if (result.marks < result.pass_marks) {
        failedSubjects++;
      }
    });
    
    const percentage = totalFullMarks > 0 ? (totalMarks / totalFullMarks) * 100 : 0;
    let grade = '';
    
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 33) grade = 'D';
    else grade = 'F';
    
    const passStatus = failedSubjects === 0 ? 'PASS' : 'FAIL';
    
    return res.json({
      success: true,
      student,
      exam,
      results,
      summary: {
        totalMarks,
        totalFullMarks,
        percentage: percentage.toFixed(2),
        grade,
        passStatus,
        failedSubjects
      }
    });
  } catch (error) {
    console.error('Get results error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get results',
      error: error.message
    });
  }
};

// Get results by roll number and exam ID
const getResultsByRollAndExam = async (req, res) => {
  try {
    const { roll, examId } = req.params;
    
    // Get student details
    const student = await getRow('SELECT * FROM students WHERE roll_number = ?', [roll]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Redirect to getResultsByStudentAndExam
    req.params.studentId = student.id;
    return getResultsByStudentAndExam(req, res);
  } catch (error) {
    console.error('Get results error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get results',
      error: error.message
    });
  }
};

// Create new result
const createResult = async (req, res) => {
  try {
    const { student_id, exam_id, subject_id, marks } = req.body;
    
    // Validate input
    if (!student_id || !exam_id || !subject_id || marks === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Student ID, exam ID, subject ID, and marks are required'
      });
    }
    
    // Check if student exists
    const student = await getRow('SELECT * FROM students WHERE id = ?', [student_id]);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if exam exists
    const exam = await getRow('SELECT * FROM exams WHERE id = ?', [exam_id]);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }
    
    // Check if subject exists
    const subject = await getRow('SELECT * FROM subjects WHERE id = ?', [subject_id]);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    // Check if result already exists
    const existingResult = await getRow(
      'SELECT * FROM results WHERE student_id = ? AND exam_id = ? AND subject_id = ?',
      [student_id, exam_id, subject_id]
    );
    
    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: 'Result already exists for this student, exam, and subject'
      });
    }
    
    // Validate marks
    if (marks < 0 || marks > subject.full_marks) {
      return res.status(400).json({
        success: false,
        message: `Marks must be between 0 and ${subject.full_marks}`
      });
    }
    
    // Create new result
    const result = await runQuery(
      'INSERT INTO results (student_id, exam_id, subject_id, marks) VALUES (?, ?, ?, ?)',
      [student_id, exam_id, subject_id, marks]
    );
    
    return res.status(201).json({
      success: true,
      message: 'Result created successfully',
      resultId: result.lastID
    });
  } catch (error) {
    console.error('Create result error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create result',
      error: error.message
    });
  }
};

// Update result
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { marks } = req.body;
    
    // Validate input
    if (marks === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Marks are required'
      });
    }
    
    // Check if result exists
    const existingResult = await getRow('SELECT * FROM results WHERE id = ?', [id]);
    
    if (!existingResult) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }
    
    // Get subject details for validation
    const subject = await getRow('SELECT * FROM subjects WHERE id = ?', [existingResult.subject_id]);
    
    // Validate marks
    if (marks < 0 || marks > subject.full_marks) {
      return res.status(400).json({
        success: false,
        message: `Marks must be between 0 and ${subject.full_marks}`
      });
    }
    
    // Update result
    await runQuery(
      'UPDATE results SET marks = ? WHERE id = ?',
      [marks, id]
    );
    
    return res.json({
      success: true,
      message: 'Result updated successfully'
    });
  } catch (error) {
    console.error('Update result error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update result',
      error: error.message
    });
  }
};

// Delete result
const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if result exists
    const result = await getRow('SELECT * FROM results WHERE id = ?', [id]);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }
    
    // Delete result
    await runQuery('DELETE FROM results WHERE id = ?', [id]);
    
    return res.json({
      success: true,
      message: 'Result deleted successfully'
    });
  } catch (error) {
    console.error('Delete result error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete result',
      error: error.message
    });
  }
};

module.exports = {
  getAllResults,
  getResultsByStudentAndExam,
  getResultsByRollAndExam,
  createResult,
  updateResult,
  deleteResult
};
