const axios = require('axios');

// const userData = {
//   username: 'jAmaanSajid123', // Use a unique username here
//   password: 'AmaanSajid@123',
//   email: 'amaansajid98@gmail.com',
//   confirmPassword: 'amaansajid',
//   collegename: 'MahindraUniversity',
//   firstname: 'Amaan',
//   lastname: 'Sajid',
// };

// axios
//   .post('http://localhost:5000/register', userData)
//   .then((response) => {
//     console.log(response.data);

//     // After successful registration, proceed with login
//     const loginData = {
//       username: 'john456', // Use the same username used for registration
//       password: 'password123',
//       otp: '123456'
//     };
//   });
//------------------------------------------------------------------------------
  // const loginData = {
  //   username: 'john456',
  //   password: 'password123',
  //   otp: '123456'
  // };
  
  // axios.post('http://localhost:5000/login', loginData)
  //   .then((response) => {
  //     const token = response.data.token;
  //     console.log('Login successful');
  //     console.log('Token:', token);
  
  //     // Store the token securely and include it in subsequent requests
  //     // to protected routes as an "Authorization" header with the value "Bearer <token>"
  //   })
  //   .catch((error) => {
  //     console.log('Login failed:', error.response.data.message);
  //   });

const sendForgotPasswordRequest = async (username) => {
  try {
    const response = await axios.post('http://localhost:5000/forgotpassword', {
      username,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending forgot password request:', error);
  }
};

const sendResetPasswordRequest = async (username, otp, newPassword) => {
  try {
    const response = await axios.post('http://localhost:5000/resetpassword', {
      username,
      otp,
      newPassword,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending reset password request:', error);
  }
};

// Call the functions to test
const username = 'jAmaanSajid123'; // Replace with the username for the user
const otp = '123456'; // Replace with the OTP entered by the user
const newPassword = 'NewPassword123'; // Replace with the new password entered by the user

// Send forgot password request
sendForgotPasswordRequest(username);

// Send reset password request
sendResetPasswordRequest(username, otp, newPassword);;

