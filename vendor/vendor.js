'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL + ':' + PORT + '/caps' || 'http://localhost:3002/caps';

const io = require('socket.io-client');
const socket = io.connect(SERVER_URL);

function placeOrder(orderDetails) {
  // console.log('about to connect to server', orderDetails)
  socket.emit('join', orderDetails);
  console.log('Vendor has joined the room: ', orderDetails.storeName);
  socket.emit('pickup', orderDetails);
}

socket.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
  process.exit(0); 
});





///////////////////////////////////
// const events = require('../eventPool');
// 
// function placeOrder(orderDetails) {
//   events.emit('pickup', orderDetails);
// }
// 
// events.on('delivered', payload => {
//   console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
// });
///////////////////////////////////

module.exports = { placeOrder };
