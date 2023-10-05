'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL + ':' + PORT + '/caps' || 'http://localhost:3002/caps';

const io = require('socket.io-client');
const socket = io.connect(SERVER_URL);

socket.on('pickup', payload => {
  socket.emit('join', payload);
  console.log('Driver joined the room: ', payload.storeName);

  setTimeout(() => {
    socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    socket.emit('delivered', payload);
    socket.emit('received', payload);
  }, 1000);

  socket.emit('getAll', { clientId: payload.storeName, eventName: 'pickup' });
});

socket.on('get-messages', payload => {
  console.log(`DRIVER: Received messages ${payload}`);
});