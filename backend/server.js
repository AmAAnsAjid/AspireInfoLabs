const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const authController = require('./controllers/authController');
const protectedController = require('./controllers/protectedController');
const registerController = require('./controllers/registerController');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Handles the login request.
 * Delegates to the authController for login functionality.
 */
app.post('/login', authController.login);

/**
 * Handles the protected route.
 * Delegates to the protectedController for accessing protected routes.
 */
app.get('/protected', authenticateToken, protectedController.protected);

/**
 * Middleware function to authenticate the token in the request headers.
 * If the token is valid, the user information is added to the request object.
 */
function authenticateToken(req, res, next) {
  // ...
}

/**
 * Handles the registration request.
 * Delegates to the registerController for registration functionality.
 */
app.post('/register', registerController.register);

// Start the server
server.listen(5000, () => {
  console.log('Server started on port 5000');
});
