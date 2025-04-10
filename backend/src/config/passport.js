const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getRow } = require('./database');

// Configure passport local strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Find admin by username
      const admin = await getRow('SELECT * FROM admins WHERE username = ?', [username]);
      
      if (!admin) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      // Compare password
      const isMatch = await bcrypt.compare(password, admin.password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, admin);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const admin = await getRow('SELECT * FROM admins WHERE id = ?', [id]);
    done(null, admin);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
