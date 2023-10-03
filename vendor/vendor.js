const events = require('../eventPool');

function placeOrder(orderDetails) {
  events.emit('pickup', orderDetails);
}

events.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
});


module.exports = { placeOrder };
