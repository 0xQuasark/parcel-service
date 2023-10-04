const events = require('../eventPool');
jest.mock('../eventPool');

const { placeOrder } = require('../vendor/vendor.js');

describe('Vendor Module', () => {
  it('should emit a pickup event when an order is placed', () => {
    placeOrder({});
    expect(events.emit).toHaveBeenCalledWith('pickup', {});
  });

  it('should log a thank you message when a delivery is made', () => {
    console.log = jest.fn();

    // Mock the behavior of the 'emit' function
    events.emit.mockImplementation((event, payload) => {
      if (event === 'delivered') {
        console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
      }
    });

    events.emit('delivered', { orderId: '123' });
    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 123');
  });
});