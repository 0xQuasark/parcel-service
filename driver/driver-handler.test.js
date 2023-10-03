const events = require('../eventPool');
jest.mock('../eventPool');

describe('Driver Module', () => {
  it('should log a pickup message when a pickup event is emitted', () => {
    console.log = jest.fn();
    events.emit('pickup', { orderId: '123' });
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 123');
  });

  it('should emit an in-transit event after picking up an order', () => {
    events.emit('pickup', { orderId: '123' });
    expect(events.emit).toHaveBeenCalledWith('in-transit', { orderId: '123' });
  });

});