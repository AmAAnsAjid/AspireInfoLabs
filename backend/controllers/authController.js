// this is my authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Handles the login request.
 * Validates the provided username, password, and OTP.
 * If the credentials are valid, a token is generated and returned.
 */
exports.login = async (req, res) => {
  const { username, password, otp } = req.body;

  try {
    // Find the user with the provided username
    const user = await User.findOne({ username });

    if (user && user.password === password && otp === '123456') {
      const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.log("Error while searching for username:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};