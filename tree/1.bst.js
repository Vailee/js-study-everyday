class Node {
  constructor(element, parent) {
    this.element = element
    this.parent = parent
    this.left = null
    this.right = null

  }
}
class Tree {
  constructor() {
    this.root = null
  }
  add(element) {
    if (this.root === null) return this.root = new Node(element)
    // 实现左右分开 与父节点比小的在左 大的在右
    let currentNode = this.root // 更新跟节点
    // if (currentNode.element < element) {
    //   currentNode.right = new Node(element, currentNode)
    // } else {
    //   currentNode.left = new Node(element, currentNode)
    // }

    let parent; //  设置父节点  用到判断放到谁身上
    let compare; // 比较正在插入的数据和上一个的大小 用来判断放左边还是右边
    while (currentNode) {
      compare = currentNode.element < element
      parent = currentNode // 记录节点
      if (compare) { // 做比较更新节点
        // 右边为根节点
        currentNode = currentNode.right
      } else {
        currentNode = currentNode.left
      }
    }
    let node = new Node(element, parent)
    if (compare) {
      parent.right = node
    } else {
      parent.left = node
    }

  }
}

let tree = new Tree();
[10, 8, 19, 6, 15, 22, 20].forEach(item =>
  tree.add(item)
)
console.dir(tree, {
  depth: 100
});