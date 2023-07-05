const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authMiddleware = require('./middlewares/authMiddleware');
const initChatSocket = require('./sockets/chatSocket');
const authController = require('./controllers/authController');
const protectedController = require('./controllers/protectedController');
const registerController = require('./controllers/registerController');
const forgotpasswordController = require('./controllers/forgotpasswordController');

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

// Middleware function to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'secret-key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/login', authController.login);
app.get('/protected', authenticateUser, protectedController.protected);
app.post('/register', registerController.register);
app.post('/forgotpassword', forgotpasswordController.forgotpassword);
app.post('/resetpassword', authenticateUser, forgotpasswordController.resetpassword);

app.post('/send-chat-message', (req, res) => {
  // Extract the chat message details from the request body
  const { sender, recipient, message } = req.body;

  // Implement your logic to send the chat message
  // Here you can use the chat socket to emit the message to the recipient user

  // Return a response indicating the message has been sent
  res.json({ success: true, message: 'Chat message sent' });
});

// Initialize chat socket
initChatSocket(server, authMiddleware);

// Start the server
server.listen(5000, () => {
  console.log('Server started on port 5000');
});
