'use strict';

const EventEmitter = require('events');

const globalEventPool = new EventEmitter();

module.exports = globalEventPool;
