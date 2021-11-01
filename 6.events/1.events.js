function EventEmitter(params) {
  this._events = {}
}
//订阅
EventEmitter.prototype.on = function(eventName, callback) {
  if (!this._events) {
    this._events = Object.create(null)
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback)
  } else {
    this._events[eventName] = [callback]
  }
}
// 发布
EventEmitter.prototype.emit = function(eventName, ...args) {
  if (this._events) return
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => fn(...args))
  }
}

EventEmitter.prototype.once = function(eventName, callback) {
  const once = (...args) => {
    callback(...args)
    this.off(eventName, once)
  }
  this.on(eventName, once)
}
EventEmitter.prototype.off = function(eventName, callback) {
  if (this._events) return
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => fn !== callback)
  }
}
module.exports = EventEmitter