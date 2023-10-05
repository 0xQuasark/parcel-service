'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL + ':' + PORT + '/caps' || 'http://localhost:3002/caps';

const io = require('socket.io-client');
const socket = io.connect(SERVER_URL);

function placeOrderForStore(storeName, orderDetails) {
  orderDetails.storeName = storeName;
  socket.emit('join', orderDetails);
  console.log('Vendor has joined the room: ', orderDetails.storeName);
  socket.emit('pickup', orderDetails);
  socket.emit('getAll', { clientId: orderDetails.storeName, eventName: 'delivered' });
}

socket.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  socket.emit('received', payload);
});

socket.on('messages', payload => {
  console.log(`VENDOR: Received message ${payload.messageId}`);
});

socket.on('get-messages', payload => {
  console.log(`VENDOR: Received messages ${payload}`);
});

module.exports = { placeOrderForStore };