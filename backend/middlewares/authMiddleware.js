const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware function to check if a user is logged in.
 * It verifies the JWT token from the request headers and checks if the user exists in the database.
 */
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secret-key');
    const { username } = decodedToken;

    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    // Store the user object in the request for future use
    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
