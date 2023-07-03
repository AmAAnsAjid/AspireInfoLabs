const axios = require('axios');

const userData = {
  username: 'john123',
  password: 'password123',
  email: 'amaan20ucse017@mahindrauniveristy.edu.in',
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
  // const loginData = {
  //   username: 'john123',
  //   password: 'password123',
  // };
  
  // axios
  //   .post('http://localhost:5000/login', loginData)
  //   .then((response) => {
  //     const token = response.data.token;
  //     console.log('Login successful');
  //     console.log('Token:', token);
  
  //     // Store the token securely and include it in subsequent requests
  //     // to protected routes as an "Authorization" header with the value "Bearer <token>"
  //   })
  //   .catch((error) => {
  //     console.error('Login failed:', error);
  //   });

