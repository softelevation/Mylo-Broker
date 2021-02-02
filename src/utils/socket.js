import io from 'socket.io-client';
let socket;
export const initiateSocket = (room) => {
  socket = io('http://104.131.39.110:3000');
  console.log('Connecting socket...');
  if (socket) {
    socket.emit('join');
  }
  socket.on('connect', (a) => {
    console.log('true', socket.connected); // true
  });
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) {
    socket.disconnect();
  }
};
export const subscribeToBooking = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on('refresh_feed', (msg) => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
};
export const sendMessage = (message) => {
  if (socket) {
    socket.emit('book_now', {message});
  }
};
