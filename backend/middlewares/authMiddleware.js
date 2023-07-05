const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware function to check if a user is logged in.
 * It verifies the JWT token from the socket handshake and checks if the user exists in the database.
 */
const authenticateUser = async (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {
    const decodedToken = jwt.verify(token, 'secret-key');
    const { username } = decodedToken;

    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return next(new Error('Invalid user'));
    }

    // Store the user object in the socket for future use
    socket.user = user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    next(new Error('Invalid token'));
  }
};

module.exports = authenticateUser;
