'use strict';

const { Server } = require('socket.io');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const SERVER_URL = process.env.SERVER_URL + ':' + PORT|| 'http://localhost:3002';

let server = new Server(PORT); // as soon as this line runs, we have something to connect to.
let capsServer = server.of('/caps');

const logEvent = (eventName, payload) => {
  let dateTime = new Date().toISOString();
  console.log(`EVENT { event: '${eventName}', time: ${dateTime}, payload: ${JSON.stringify(payload)} }`);
};

const logger = (type) => (payload) => {
  const eventDetails = {
    event: type,
    time: new Date().toISOString(),
    payload: payload,
  }
  console.log(`EVENT`, eventDetails);
}

capsServer.on('connection', socket => {
  // console.log('Welcome to the CAPS server!');

  socket.on('join', payload => {
    // console.log('ROOM Joined: ', payload.storeName);
    socket.join(payload.storeName);
  });
  
  socket.on('pickup', payload => {
    socket.broadcast.emit('pickup', payload);
    logger('pickup')(payload);
  });

  socket.on('in-transit', payload => {
    socket.broadcast.emit('in-transit', payload);
    logger('in-transit')(payload);
  });
  
  socket.on('delivered', payload => {
    socket.broadcast.emit('delivered', payload);
    logger('delivered')(payload);
  });

});  

///////////////////////////////////
// const events = require('./eventPool');

// const logEvent = (eventName, payload) => {
//   let dateTime = new Date().toISOString();
//   console.log(`EVENT { event: '${eventName}', time: ${dateTime}, payload: ${JSON.stringify(payload)} }`);
// };

// events.on('pickup', payload => {
//   logEvent('pickup', payload);
// });

// events.on('in-transit', payload => {
//   logEvent('in-transit', payload);
// });

// events.on('delivered', payload => {
//   logEvent('delivered', payload);
// });
///////////////////////////////////
