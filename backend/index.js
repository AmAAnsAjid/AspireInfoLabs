const axios = require('axios');

const userData = {
  username: 'john123',
  password: 'password123',
  email: 'emmanuelle.hickle59@ethereal.email',
  confirmPassword: 'password123',
  collegename: 'ABC College',
  firstname: 'John',
  lastname: 'Doe',
};

axios
  .post('http://localhost:5000/register', userData)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
  const loginData = {
    username: 'john123',
    password: 'password123',
    otp:'123456'
  };
  
  axios
    .post('http://localhost:5000/login', loginData)
    .then((response) => {
      const token = response.data.token;
      console.log('Login successful');
      console.log('Token:', token);
  
      // Store the token securely and include it in subsequent requests
      // to protected routes as an "Authorization" header with the value "Bearer <token>"
    })
    .catch((error) => {
      console.log('Login failed:', error);
    });

