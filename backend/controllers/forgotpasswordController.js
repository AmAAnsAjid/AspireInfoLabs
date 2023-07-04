const User = require('../models/User');
const generateOTP = require('../helpers/otp');
const sendOTP = require('../helpers/email');

const forgotpassword = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();
    // Save the OTP to the user document
    // Send OTP to user's email
    sendOTP(user.email, otp);

    res.json({ message: 'OTP sent to registered email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const resetpassword = async (req, res) => {
  try {
    const { username, otp, newPassword } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the OTP matches
    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the password
    user.password = newPassword;
    user.otp = undefined; // Clear the OTP field
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { forgotpassword, resetpassword };