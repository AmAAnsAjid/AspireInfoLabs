//register
const axios = require('axios');

// const userData = {
//   username: 'Siddant123', // Use a unique username here
//   password: 'Siddant@123',
//   email: 'siddant98@gmail.com',
//   confirmPassword: 'Siddant@123',
//   collegename: 'MahindraUniversity',
//   firstname: 'Siddant',
//   lastname: 'Yadav',
// };

// axios.post('http://localhost:5000/register', userData)
//   .then((response) => {
//     console.log(response.data);
//     console.log('Registration successful');
//   })
//   .catch((error) => {
//     console.log('Registration failed:', error.response.data.message);
//   });


//-------------------------------------------------
//Login

const loginData = {
  username: 'jAmaanSajid123',
  password: 'NewPassword123',
  otp: '123456'
};

axios.post('http://localhost:5000/login', loginData)
  .then((response) => {
    console.log('Login successful');
    console.log('Token:', response.data.token);

    // After successful login, simulate sending a chat message
    const chatMessage = {
      sender: 'jAmaanSajid123', // Replace with the sender's username
      recipient: 'Siddant123', // Replace with the recipient's username
      message: 'Hello, how are you?' // Replace with the actual message
    };

    // Make a POST request to your server's endpoint to send the chat message
    axios.post('http://localhost:5000/send-chat-message', chatMessage)
      .then((response) => {
        console.log('Chat message sent:', response.data);
      })
      .catch((error) => {
        console.error('Error sending chat message:', error);
      });
  })
  .catch((error) => {
    console.log('Login failed:', error.response.data.message);
  });





// const sendForgotPasswordRequest = async (username) => {
//   try {
//     const response = await axios.post('http://localhost:5000/forgotpassword', {
//       username,
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error sending forgot password request:', error);
//   }
// };

// const sendResetPasswordRequest = async (username, otp, newPassword) => {
//   try {
//     const response = await axios.post('http://localhost:5000/resetpassword', {
//       username,
//       otp,
//       newPassword,
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error sending reset password request:', error);
//   }
// };

// // Call the functions to test
// const username = 'jAmaanSajid123'; // Replace with the username for the user
// const otp = '123456'; // Replace with the OTP entered by the user
// const newPassword = 'NewPassword123'; // Replace with the new password entered by the user

// // Send forgot password request
// sendForgotPasswordRequest(username);

// // Send reset password request
// sendResetPasswordRequest(username, otp, newPassword);

