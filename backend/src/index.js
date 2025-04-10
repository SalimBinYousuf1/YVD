const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('./config/passport');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false // Disabled for development, enable in production
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const examRoutes = require('./routes/exam');
const subjectRoutes = require('./routes/subject');
const resultRoutes = require('./routes/result');
const announcementRoutes = require('./routes/announcement');
const uploadRoutes = require('./routes/upload');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Result Declaration API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
