const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { runQuery, getRow } = require('../config/database');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for CSV
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'), false);
  }
};

// Initialize upload
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

// Upload CSV and process results
const uploadResults = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { examId } = req.body;
    
    if (!examId) {
      return res.status(400).json({
        success: false,
        message: 'Exam ID is required'
      });
    }

    // Check if exam exists
    const exam = await getRow('SELECT * FROM exams WHERE id = ?', [examId]);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    const results = [];
    const errors = [];
    let processedRows = 0;

    // Process CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          processedRows++;
          
          // Validate required fields
          if (!row.roll_number || !row.subject_code || !row.marks) {
            errors.push({
              row: processedRows,
              error: 'Missing required fields (roll_number, subject_code, marks)'
            });
            return;
          }

          // Find student by roll number
          const student = await getRow('SELECT * FROM students WHERE roll_number = ?', [row.roll_number]);
          
          if (!student) {
            errors.push({
              row: processedRows,
              roll_number: row.roll_number,
              error: 'Student not found'
            });
            return;
          }

          // Find subject by code
          const subject = await getRow('SELECT * FROM subjects WHERE code = ?', [row.subject_code]);
          
          if (!subject) {
            errors.push({
              row: processedRows,
              roll_number: row.roll_number,
              subject_code: row.subject_code,
              error: 'Subject not found'
            });
            return;
          }

          // Validate marks
          const marks = parseInt(row.marks);
          
          if (isNaN(marks) || marks < 0 || marks > subject.full_marks) {
            errors.push({
              row: processedRows,
              roll_number: row.roll_number,
              subject_code: row.subject_code,
              error: `Invalid marks. Must be between 0 and ${subject.full_marks}`
            });
            return;
          }

          // Check if result already exists
          const existingResult = await getRow(
            'SELECT * FROM results WHERE student_id = ? AND exam_id = ? AND subject_id = ?',
            [student.id, examId, subject.id]
          );

          if (existingResult) {
            // Update existing result
            await runQuery(
              'UPDATE results SET marks = ? WHERE id = ?',
              [marks, existingResult.id]
            );

            results.push({
              row: processedRows,
              roll_number: row.roll_number,
              student_name: student.name,
              subject_code: row.subject_code,
              subject_name: subject.name,
              marks,
              status: 'updated'
            });
          } else {
            // Create new result
            const result = await runQuery(
              'INSERT INTO results (student_id, exam_id, subject_id, marks) VALUES (?, ?, ?, ?)',
              [student.id, examId, subject.id, marks]
            );

            results.push({
              row: processedRows,
              roll_number: row.roll_number,
              student_name: student.name,
              subject_code: row.subject_code,
              subject_name: subject.name,
              marks,
              status: 'created',
              id: result.lastID
            });
          }
        } catch (error) {
          errors.push({
            row: processedRows,
            error: error.message
          });
        }
      })
      .on('end', () => {
        // Delete the temporary file
        fs.unlinkSync(req.file.path);

        return res.json({
          success: true,
          message: 'CSV processed successfully',
          totalRows: processedRows,
          successCount: results.length,
          errorCount: errors.length,
          results,
          errors
        });
      })
      .on('error', (error) => {
        // Delete the temporary file if it exists
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
          success: false,
          message: 'Failed to process CSV',
          error: error.message
        });
      });
  } catch (error) {
    // Delete the temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error('Upload results error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload results',
      error: error.message
    });
  }
};

module.exports = {
  upload,
  uploadResults
};
