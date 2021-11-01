const LinkedList = require('../LinkedList')
class Queue {
  constructor() {
    this.ll = new LinkedList
  }
  poll() {
    let removeNode = this.ll.remove(0)
    return removeNode && removeNode.element
  }
  offer(element) {
    this.ll.add(element)
  }
}
module.exports = Queue