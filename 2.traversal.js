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
  preorderTraversal() {
    function traversal(node) { // 写递归先考虑终止条件
      if (node === null) return
      console.log(node.element);
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 层次遍历 将node放入栈中 如果子左右有值 入栈 
  levelOrderTraversal(cb) {
    let stack = [this.root]
    let index = 0
    let currentNode
    while (currentNode = stack[index++]) {
      cb(currentNode);
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
  }
  reverse() {
    let stack = [this.root]
    let index = 0
    let currentNode
    while (currentNode = stack[index++]) {

      let temp = currentNode.left
      currentNode.left = currentNode.right
      currentNode.right = temp

      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
  }
}

let tree = new Tree();
[10, 8, 19, 6, 15, 22, 20].forEach(item =>
  tree.add(item)
)
// console.dir(tree, {
//   depth: 100
// });
// console.log(tree.preorderTraversal());
tree.levelOrderTraversal((node) => {
  node.element *= 2
  console.log(node);
})
// 遍历 -- 递归  栈
// 先序 中 左 右
// 中序 左 中 右
// 后续 左 右 中
// 层序