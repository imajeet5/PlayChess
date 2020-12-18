import io from 'socket.io-client';

const URL = 'http://localhost:8001/';

const socket = io(URL, { upgrade: true, autoConnect: false });

// socket.on('connect', () => {
//   console.log('Socket connected id: ', socket.id);
// });
socket.on('disconnected', () => {
  console.log('Socket disconnected');
});

socket.on('global', (message) => {
  console.log(message);
});

socket.on('GameCreated', (message) => {
  console.log(message);
});
socket.on('local', (message) => {
  console.log(message);
});

export default socket;
