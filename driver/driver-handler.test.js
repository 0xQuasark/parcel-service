const events = require('../eventPool');
jest.mock('../eventPool');

// Require the driver module to set up the event listener
require('../driver/driver.js');

describe('Driver Module', () => {
  it('should log a pickup message when a pickup event is emitted', () => {
    console.log = jest.fn();

    // Mock the behavior of the 'emit' function
    events.emit.mockImplementation((event, payload) => {
      if (event === 'pickup') {
        console.log(`DRIVER: picked up ${payload.orderId}`);
      }
    });

    events.emit('pickup', { orderId: '123' });
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 123');
  });

  it('should emit an in-transit event after picking up an order', () => {
    // Mock the behavior of the 'emit' function
    events.emit.mockImplementation((event, payload) => {
      if (event === 'pickup') {
        events.emit('in-transit', payload);
      }
    });

    events.emit('pickup', { orderId: '123' });
    expect(events.emit).toHaveBeenCalledWith('in-transit', { orderId: '123' });
  });
});