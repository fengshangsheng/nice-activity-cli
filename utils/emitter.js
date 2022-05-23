class Event {
  constructor() {
    this.eventList = new Map()
  }

  on(eventName, fn) {
    const hasIn = this._hasInEvent()
    let events = [];
    if (hasIn) {
      events = this.eventList.get(eventName);
    }
    events.push(fn);

    this.eventList.set(eventName, events);
  }

  off(eventName) {
    const hasIn = this._hasInEvent()

    if (hasIn) {
      this.eventList.delete(eventName);
    }
  }

  notify(eventName, ...args) {
    const hasIn = this._hasInEvent()
    if (hasIn) {
      const events = this.eventList.get(eventName);
      events.map((fn) => {
        fn(...args);
      })
    }
  }

  _hasInEvent(eventName) {
    return this.eventList.has(eventName);
  }
}

module.exports = {
  eventEmitter: new Event(),
};
