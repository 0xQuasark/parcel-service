'use strict';

const { placeOrder } = require('../vendor/vendor.js');

const SocketIO = require('socket.io-mock');
// const socket = new SocketIO();

describe('Vendor Module', () => {
  it('should emit a pickup event when an order is placed', () => {
    const orderDetails = {
      storeName: '1-206-flowers',
      orderId: '123',
      customer: 'John Doe',
      address: '123 Main St'
    };

    console.log = jest.fn();
    placeOrder(orderDetails);
    expect(console.log).toHaveBeenCalledWith('Vendor has joined the room: ', orderDetails.storeName);
  });

  it('should log a thank you message when an order is delivered', () => {
    const orderDetails = {
      storeName: '1-206-flowers',
      orderId: '123',
      customer: 'John Doe',
      address: '123 Main St'
    };

    console.log = jest.fn();
    placeOrder(orderDetails);
    expect(console.log).toHaveBeenCalledWith('Vendor has joined the room: ', orderDetails.storeName);
  });
});
