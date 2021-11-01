// node 是基于事件的 内部自己实现了一个发布订阅模式
const EventEmitter = require('events')
const util = require('util')
let event = new EventEmitter()

// on emit once off newListener

function Girl() {

}
// 让一个类继承EventEmitter原型的方法
//  Object.create() Girl.prototype.__proto__ = EventEmitter.prototype Object.setPrototypeOf extends

// Girl.prototype = Object.create(EventEmitter.prototype)
// Girl.prototype.__proto__ = EventEmitter.prototype
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
util.inherits(Girl, EventEmitter)

let girl = new Girl()
console.log(girl.on);

girl.on('newListener', function(type) { //用来监听用户绑定了哪些事件
  console.log(type);
})
girl.once('失恋', () => {
  console.log('cry');
})
// girl.on('失恋', () => {
//   console.log('eat');
// })
let eat = () => {
  console.log('eat');
}
girl.on('失恋', eat)
girl.off('失恋', eat)
girl.emit('失恋')
girl.emit('失恋') //多次触发 使用once 只调一次 