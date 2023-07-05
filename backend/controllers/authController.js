const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateUser = require('../middlewares/authMiddleware');

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
    console.log('Error while searching for username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Example protected route that requires authentication.
 * This route can only be accessed by a logged-in user.
 */
exports.protected = (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
};

/**
 * Example route that is protected and requires authentication.
 * The `authenticateUser` middleware is used to check if the user is logged in.
 */
exports.exampleProtectedRoute = (req, res) => {
  // Handle the protected route logic here
  res.json({ message: 'Example protected route accessed successfully' });
};
