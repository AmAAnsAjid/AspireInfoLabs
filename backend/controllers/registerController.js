const fs = require('fs');
const generateOTP = require('../helpers/otp');
const sendOTP = require('../helpers/email');

/**
 * Handles the registration request.
 * Saves the user data to the 'details.json' file.
 * Generates an OTP and sends it to the registered email.
 */
exports.register = async (req, res) => {
  try {
    const userData = req.body; // Assuming req.body contains the user data

    // Read the existing data from the file
    let existingData = [];
    try {
      const fileData = fs.readFileSync('details.json');
      existingData = JSON.parse(fileData);
    } catch (error) {
      // If the file does not exist or is empty, no need to throw an error
      console.log('No existing data found');
    }

    // Add the new user data to the existing data
    existingData.push(userData);

    // Write the updated data back to the file
    fs.writeFileSync('details.json', JSON.stringify(existingData, null, 2));

    const otp = generateOTP(); // You can implement your own OTP generation logic

    // Send OTP via email
    sendOTP(userData.email, otp); // Pass the registered email and OTP to the sendOTP function

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
