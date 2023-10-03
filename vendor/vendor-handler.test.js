const events = require('../eventPool');
const { placeOrder } = require('../vendor/vendor.js');

jest.mock('../eventPool');

describe('Vendor Module', () => {
  it('should emit a pickup event when an order is placed', () => {
    placeOrder({});
    expect(events.emit).toHaveBeenCalledWith('pickup', {});
  });

  it('should log a thank you message when a delivery is made', () => {
    console.log = jest.fn();
    events.emit('pickup', orderDetails);
    events.emit('delivered', { orderId: '123' });
    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 123');
  });
});