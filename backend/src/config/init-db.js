const { db, runQuery } = require('./database');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Create tables if they don't exist
const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');

    // Create admins table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create exams table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS exams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        class TEXT NOT NULL,
        year INTEGER NOT NULL,
        term TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create students table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roll_number TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        class TEXT NOT NULL,
        section TEXT,
        dob TEXT,
        gender TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create subjects table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        full_marks INTEGER NOT NULL DEFAULT 100,
        pass_marks INTEGER NOT NULL DEFAULT 33,
        class TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create results table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        exam_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        marks INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
        FOREIGN KEY (exam_id) REFERENCES exams (id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects (id) ON DELETE CASCADE,
        UNIQUE(student_id, exam_id, subject_id)
      )
    `);

    // Create announcements table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if default admin exists
    const adminExists = await db.get('SELECT * FROM admins WHERE username = ?', 
      [process.env.ADMIN_DEFAULT_USERNAME || 'admin1']);

    // Create default admin if not exists
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_DEFAULT_PASSWORD || 'admin123', 
        10
      );
      
      await runQuery(`
        INSERT INTO admins (username, password, name, email)
        VALUES (?, ?, ?, ?)
      `, [
        process.env.ADMIN_DEFAULT_USERNAME || 'admin1',
        hashedPassword,
        'Administrator',
        'admin@example.com'
      ]);
      
      console.log('Default admin created');
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    // Keep the connection open for the application
  }
};

// Run initialization
initializeDatabase();

module.exports = { initializeDatabase };
