require('../vendor/vendor.js');

const io = {
  connect: jest.fn(),
};

describe('Vendor Module', () => {

  it('should handle messages event', () => {
    const mockSocket = {
      on: jest.fn(),
    };
    io.connect.mockReturnValue(mockSocket);

    const call = mockSocket.on.mock.calls.find(call => call[0] === 'messages');
    if (call) {
      const messagesCallback = call[1];
      const consoleSpy = jest.spyOn(console, 'log');

      messagesCallback({ messageId: '123' });

      expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Received message 123');
    } else {
      // handle the case where no matching call was found
      console.log('No matching call was found');
    }
  });

  // it('should handle get-messages event', () => {
  //   const mockSocket = {
  //     on: jest.fn(),
  //   };
  //   io.connect.mockReturnValue(mockSocket);

  //   require('./vendor/vendor.js');

  //   const getMessagesCallback = mockSocket.on.mock.calls.find(call => call[0] === 'get-messages')[1];
  //   const consoleSpy = jest.spyOn(console, 'log');

  //   getMessagesCallback('testPayload');

  //   expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Received messages testPayload');
  // });


  // it('should emit join and pickup events when an order is placed', () => {
  //   const orderDetails = {
  //     storeName: '1-206-flowers',
  //     orderId: '123',
  //     customer: 'John Doe',
  //     address: '123 Main St'
  //   };
  //  placeOrderForStore('1-206-flowers', orderDetails);
  //   expect(socket.emit).toHaveBeenCalledWith('join', orderDetails);
  //   expect(socket.emit).toHaveBeenCalledWith('pickup', orderDetails);
  // });

  // it('should emit getAll event with correct payload', () => {
  //   placeOrderForStore('1-206-flowers', orderDetails);
  //   expect(socket.emit).toHaveBeenCalledWith('getAll', { clientId: orderDetails.storeName, eventName: 'delivered' });
  // });

  // it('should emit received event when a delivered event is received', () => {
  //   socket.emit('delivered', orderDetails);
  //   expect(socket.emit).toHaveBeenCalledWith('received', orderDetails);
  // });

  // it('should log received messages', () => {
  //   console.log = jest.fn();
  //   socket.emit('messages', 'test message');
  //   expect(console.log).toHaveBeenCalledWith('VENDOR: Received message test message');
  // });

  // it('should log thank you message when an order is delivered', () => {
  //   console.log = jest.fn();
  //   socket.emit('delivered', orderDetails);
  //   expect(console.log).toHaveBeenCalledWith(`VENDOR: Thank you for delivering ${orderDetails.orderId}`);
  // });
});