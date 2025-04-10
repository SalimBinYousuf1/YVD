const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = path.resolve(process.env.DATABASE_PATH || './database/results.db');

// Create a new database connection
const createDbConnection = () => {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to SQLite database at:', dbPath);
    }
  });
};

// Get database connection
const db = createDbConnection();

// Run query with promise wrapper
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
        return;
      }
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

// Get all rows with promise wrapper
const getAllRows = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

// Get single row with promise wrapper
const getRow = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        console.error('Error executing query:', err.message);
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};

module.exports = {
  db,
  runQuery,
  getAllRows,
  getRow
};
