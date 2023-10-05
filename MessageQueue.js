class MessageQueue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    this.data[key] = value;
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    delete this.data[key];
  }

  getAll() {
    return Object.values(this.data);
  }
}

module.exports = MessageQueue;