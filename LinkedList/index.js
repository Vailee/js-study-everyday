// class Node {
//   constructor(element, next) {
//     this.element = element, //  数据
//       this.next = next  // 指针
//   }
// }
// class LinkedList {
//   constructor() {
//     this.head = null  // 头指针
//     this.size = 0
//   }
//   add(index, element) { // 增加
//     if (arguments.length === 1) {
//       element = index // 如果只传了一个值
//       index = this.size
//     }
//     if (index < 0 || index > this.size) {
//       throw new Error('链表索引异常')
//     }
//     if (index === 0) {
//       let head = this.head
//       this.head = new Node(element, head)
//     } else {
//       let prevNode = this.getNode(index - 1)
//       prevNode.next = new Node(element, prevNode.next)
//     }
//     this.size++
//     console.log(index, element);
//   }
//   remove(index) { // 删除

//   }
//   getNode(index) { // 获取节点
//     let current = this.head
//     for (let i = 0; i < index; i++) {
//       current = current.next;
//     }
//     return current
//   }
//   length() { // 链表个数
//     return this.size
//   }
// }
// let ll = new LinkedList()
// ll.add(0, 100)
// ll.add(0, 200)
// ll.add(300) // 200 100 300


class Node {
  constructor(element, next) {
    this.element = element, //  数据
      this.next = next // 指针
  }
}
class LinkedList {
  constructor() {
    this.head = null // 头指针
    this.size = 0
  }
  _node(index) { // 查找节点
    let current = this.head
    // console.log(current);
    for (let i = 0; i < index; i++) {
      current = current.next

    }
    return current
  }
  add(index, element) {
    //添加的时候创造一个添加的节点 让这个节点的next 指向前一个的next
    // 让前一个人的next指向自己
    let head = this.head

    if (arguments.length === 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('链表索引异常')
    }
    // 判断当前节点是不是第一个 
    if (index === 0) {
      this.head = new Node(element, head)
    } else {
      // 不是第一个 获取前一个节点 
      let prevNode = this._node(index - 1) // 需要找到上一个 所以需要减1
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }
  remove(index) { // 删除
    // 上一个的指向 下一个的下一个 所以需要找到删除底前一个
    // 删除的是头 
    let removeNode
    if (index === 0) {
      removeNode = this.head
      if (removeNode !== null) {
        this.head = this.head.next
        this.size--
      }
    } else {
      let prevNode = this._node(index - 1)
      removeNode = prevNode.next
      prevNode.next = prevNode.next.next
      this.size--
    }
    return removeNode
  }
  reverse() {
    // 递归
    function r(head) {
      if (head == null || head.next === null) { // 空链表 或者只有一个
        return head
      }
      let newHead = r(head.next) // 先从最底层进行反转  这里会一直向下找 拿到最后一个
      head.next.next = head
      head.next = null
      return newHead
    }
    this.head = r(this.head)
    return this.head
  }
  reverse1() {
    // 循环
    let head = this.head
    if (head == null || head.next === null) { // 空链表 或者只有一个
      return head
    }
    let newHead = null
    while (head !== null) { // 判断老的头是否为null ，不是就一直搬到 newHead里去
      let temp = head.next // 保留第2个 
      head.next = newHead // 让第1个为null
      newHead = head // 让新链表的头等于老链表的头
      head = temp // 把老的链表指向第2个

    }
    this.head = newHead
    return newHead
  }
}

module.exports = LinkedList
// let ll = new LinkedList()
// ll.add(1)
// ll.add(2)
// ll.add(3)
// ll.add(4)
// ll.add(5)
// ll.add(2, 500)
// console.dir(ll, {
//   depth: 100
// });
// console.log(ll.reverse()) //  链表的反转