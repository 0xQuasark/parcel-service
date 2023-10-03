'use strict';

const events = require('./eventPool');

const logEvent = (eventName, payload) => {
  let dateTime = new Date().toISOString();
  console.log(`EVENT { event: '${eventName}', time: ${dateTime}, payload: ${JSON.stringify(payload)} }`);
};

events.on('pickup', payload => {
  logEvent('pickup', payload);
});

events.on('in-transit', payload => {
  logEvent('in-transit', payload);
});

events.on('delivered', payload => {
  logEvent('delivered', payload);
});
