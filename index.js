'use strict'

var Chance = require('chance');

require('./hub.js');        // I notice that the order that the listeners execute depends on when we import
const { placeOrder } = require('./vendor/vendor.js');
require('./driver/driver.js');


// Instantiate Chance so it can be used
var chance = new Chance();

const order = {
  storeName: chance.company(),
  // storeName: '1-206-flowers',
  orderId: chance.guid(),
  customer: chance.name(),
  address: chance.address()
}

// console.log('about to place order')
placeOrder(order);

