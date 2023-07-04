const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authController = require('./controllers/authController');
const protectedController = require('./controllers/protectedController');
const registerController = require('./controllers/registerController');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.post('/login', authController.login);
app.get('/protected', authenticateToken, protectedController.protected);
app.post('/register', registerController.register);

// Middleware and server setup code...

// Start the server
server.listen(5000, () => {
  console.log('Server started on port 5000');
});
