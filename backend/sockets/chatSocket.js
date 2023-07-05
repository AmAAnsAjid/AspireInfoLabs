const socketIO = require('socket.io');

// Create a function to initialize the chat socket
const initChatSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat messages
    socket.on('chat', (message) => {
      console.log('Received message:', message);

      // Check if the sender is authenticated/logged in
      // Implement your authentication logic here
      // You can access the user information from the socket or the provided message object
      const authenticated = true; // Replace this with your actual authentication logic

      if (authenticated) {
        // Perform a check if the user to chat with exists
        const { sender, recipient, message: chatMessage } = message;

        // Replace the condition with your own logic to check if the recipient user exists and is available for chat
        if (recipient === 'recipientUsername') {
          // Emit the chat message to the recipient user
          socket.emit('chat', { sender, message: chatMessage });
        } else {
          // Emit an error message or handle the case when the recipient user is not available
          socket.emit('chat-error', 'Recipient user not found or not available for chat');
        }
      } else {
        // Emit an error message or handle unauthorized access
        socket.emit('chat-error', 'Unauthorized access');
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = initChatSocket;
