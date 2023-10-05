'use strict';

const { Server } = require('socket.io');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL + ':' + PORT || 'http://localhost:3002';
const MessageQueue = require('./MessageQueue');

let server = new Server(PORT);
let capsServer = server.of('/caps');
let driverQueue = new MessageQueue();
let vendorQueue = new MessageQueue();

const logger = (type) => (payload) => {
  const eventDetails = {
    event: type,
    time: new Date().toISOString(),
    payload: payload,
  }
  console.log(`EVENT`, eventDetails);
}

capsServer.on('connection', socket => {
  socket.on('join', payload => {
    socket.join(payload.storeName);
  });

  socket.on('pickup', payload => {
    socket.broadcast.emit('pickup', payload);
    logger('pickup')(payload);
    driverQueue.store(payload.orderId, payload);
  });

  socket.on('delivered', payload => {
    socket.broadcast.emit('delivered', payload);
    logger('delivered')(payload);
    vendorQueue.store(payload.orderId, payload);
    socket.emit('get-messages', { clientId: payload.storeName, eventName: 'delivered' });
  });

  socket.on('received', payload => {
    driverQueue.remove(payload.messageId);
    vendorQueue.remove(payload.messageId);
  });

  socket.on('getAll', payload => {
    let queue = payload.eventName === 'pickup' ? driverQueue : vendorQueue;
    let allMessages = queue.getAll();
    allMessages.forEach(message => socket.emit('messages', message));
  });
});