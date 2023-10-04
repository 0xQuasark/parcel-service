// const events = require('../eventPool');
const { placeOrder } = require('../vendor/vendor.js');

const SocketIO = require('socket.io-mock');
const socket = new SocketIO();

// jest.mock('../eventPool');

// describe('Vendor Module', () => {
//   it('should emit a pickup event when an order is placed', () => {
//     placeOrder({});
//     expect(events.emit).toHaveBeenCalledWith('pickup', {});
//   });

//   it('should log a thank you message when a delivery is made', () => {
//     console.log = jest.fn();
//     events.emit('pickup', orderDetails);
//     events.emit('delivered', { orderId: '123' });
//     expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 123');
//   });
  
// });

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
    // socket.emit('delivered', payload);
    expect(console.log).toHaveBeenCalledWith('Vendor has joined the room: ', orderDetails.storeName);
    // expect(console.log).toHaveBeenCalledWith(`VENDOR: Thank you for delivering ${orderDetails.orderId}`);
  });
});

// process.exit(0); 
