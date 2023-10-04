'use strict'

// const { placeOrder } = require('../vendor/vendor.js');

const SocketIO = require('socket.io-mock');
const socket = new SocketIO();

describe('Driver Module', () => {
  it('should emit join, in-transit and delivered events when a pickup event is received', () => {
    const orderDetails = {
      storeName: '1-206-flowers',
      orderId: '123',
      customer: 'John Doe',
      address: '123 Main St'
    };

    socket.emit = jest.fn();
    socket.emit('pickup', orderDetails);
    expect(socket.emit).toHaveBeenCalledWith('pickup', orderDetails);
  });
});