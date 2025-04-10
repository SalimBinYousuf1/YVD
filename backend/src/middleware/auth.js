const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  // Check if user is authenticated via session
  if (req.isAuthenticated()) {
    return next();
  }

  // Check if user is authenticated via JWT
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.username === process.env.ADMIN_DEFAULT_USERNAME) {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. Admin privileges required.' 
  });
};

module.exports = {
  isAuthenticated,
  isAdmin
};
