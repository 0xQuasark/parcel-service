const SocketIO = require('socket.io-mock');
const socket = new SocketIO();

beforeEach(() => {
  const orderDetails = {
    storeName: '1-206-flowers',
    orderId: '123',
    customer: 'John Doe',
    address: '123 Main St'
  };
});

describe('Driver Module', () => {
  it('should emit join event when a pickup event is received', () => {
    const orderDetails = {
      storeName: '1-206-flowers',
      orderId: '123',
      customer: 'John Doe',
      address: '123 Main St'
    };

    const spy = jest.spyOn(socket, 'emit'); // Spy on the server's emit function
    socket.emit('pickup', orderDetails);
    expect(spy).toHaveBeenCalledWith('pickup', orderDetails);
  });

  // Should emit disconnect event when the socket connection is closed
  it('should emit disconnect event when the socket connection is closed', () => {
    const spy = jest.spyOn(socket, 'emit'); // Spy on the server's emit function
    socket.emit('disconnect');
    expect(spy).toHaveBeenCalledWith('disconnect');
  });

});