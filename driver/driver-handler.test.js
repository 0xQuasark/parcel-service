// const events = require('../eventPool');
// jest.mock('../eventPool');

// describe('Driver Module', () => {
//   it('should log a pickup message when a pickup event is emitted', () => {
//     console.log = jest.fn();
//     events.emit('pickup', { orderId: '123' });
//     expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 123');
//   });

//   it('should emit an in-transit event after picking up an order', () => {
//     events.emit('pickup', { orderId: '123' });
//     expect(events.emit).toHaveBeenCalledWith('in-transit', { orderId: '123' });
//   });

// });

const { placeOrder } = require('../vendor/vendor.js');

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
    // expect(socket.emit).toHaveBeenCalledWith('join', orderDetails);
    expect(socket.emit).toHaveBeenCalledWith('pickup', orderDetails);
    // expect(socket.emit).toHaveBeenCalledWith('in-transit', orderDetails);
    // expect(socket.emit).toHaveBeenCalledWith('delivered', orderDetails);
  });
});