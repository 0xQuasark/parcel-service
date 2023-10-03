const events = require('../eventPool');

events.on('pickup', payload => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  events.emit('in-transit', payload);

  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.orderId}`);
    events.emit('delivered', payload);
  }, 500);
});