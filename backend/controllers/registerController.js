const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming you have a User model defined

const register = async (req, res) => {
  try {
    const userData = req.body;

    // Create a new user document using the User model
    const user = new User(userData);

    // Save the user document to the database
    await user.save();

    const otp = generateOTP();

    sendOTP(userData.email, otp);

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

function generateOTP() {
  // Generate OTP logic here
  return '123456'; // Replace with your OTP generation code
}

function sendOTP(email, otp) {
  // Email sending logic using nodemailer
  // ...
}

module.exports = { register };
