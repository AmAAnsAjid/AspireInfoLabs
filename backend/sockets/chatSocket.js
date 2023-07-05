const socketIO = require('socket.io');
const authenticateUser = require('../middlewares/authMiddleware');

const initChatSocket = (server) => {
  const io = socketIO(server);

  io.use(authenticateUser);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat messages
    socket.on('chat', (message) => {
      console.log('Received message:', message);

      const { sender, recipient, message: chatMessage } = message;

      // Replace the condition with your own logic to check if the recipient user exists and is available for chat
      if (recipient === 'recipientUsername') {
        // Emit the chat message to the recipient user
        socket.emit('chat', { sender, message: chatMessage });
      } else {
        // Emit an error message or handle the case when the recipient user is not available
        socket.emit('chat-error', 'Recipient user not found or not available for chat');
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = initChatSocket;
