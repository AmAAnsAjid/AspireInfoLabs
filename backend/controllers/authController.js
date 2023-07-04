const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 * Handles the login request.
 * Validates the provided username, password, and OTP.
 * If the credentials are valid, a token is generated and returned.
 */
exports.login = (req, res) => {
  const { username, password, otp } = req.body;

  try {
    // Read the user data from the file
    const fileData = fs.readFileSync('details.json');
    const users = JSON.parse(fileData);

    // Find the user with the provided username
    const user = users.find((user) => user.username === username);

    if (user && user.password === password && otp === '123456') {
      const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.log("Error while searching for username");
    res.status(500).json({ message: 'Internal server error' });
  }
};
