const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { getRow, runQuery } = require('../config/database');
require('dotenv').config();

// Login controller
const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: info.message || 'Authentication failed' 
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    });
  })(req, res, next);
};

// Register controller
const register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    
    // Validate input
    if (!username || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and name are required'
      });
    }
    
    // Check if username already exists
    const existingUser = await getRow('SELECT * FROM admins WHERE username = ?', [username]);
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new admin
    const result = await runQuery(
      'INSERT INTO admins (username, password, name, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, name, email]
    );
    
    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      adminId: result.lastID
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const admin = await getRow('SELECT id, username, name, email, created_at FROM admins WHERE id = ?', [req.user.id]);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    return res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message
    });
  }
};

// Logout controller (for session-based auth)
const logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
};

module.exports = {
  login,
  register,
  getProfile,
  logout
};
