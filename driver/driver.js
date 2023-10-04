'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL + ':' + PORT + '/caps' || 'http://localhost:3002/caps';


const io = require('socket.io-client');
const socket = io.connect(SERVER_URL);

socket.on('pickup', payload => {
  // console.log('Driver is about to join the room: ', payload.storeName);
  socket.emit('join', payload);
  console.log('Driver joined the room: ', payload.storeName);

  setTimeout(() => {
    socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    socket.emit('delivered', payload);
  }, 1000);
});


///////////////////////////////////
// const events = require('../eventPool');

// events.on('pickup', payload => {
//   console.log(`DRIVER: picked up ${payload.orderId}`);
//   events.emit('in-transit', payload);

//   setTimeout(() => {
//     console.log(`DRIVER: delivered up ${payload.orderId}`);
//     events.emit('delivered', payload);
//   }, 500);
// });
///////////////////////////////////