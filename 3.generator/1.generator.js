// promise 中还是有很多问题 内部还是采用回调的方式，如果逻辑过多还是可能会导致回调地狱
// 希望写的代码更像同步一些 ---> generator
// koa1.0 generator ---》 koa2 async+await
// generator 函数可以实现暂停功能 ->redux-saga dva
// yield 产出 
// function* gen(params) { // * 迭代器函数 根据指针向下执行  指针+switch、case来实现
//   yield 1
//   yield 2
//   yield 3
//   return 100
// }
// let it = gen()
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());




function gen$(context) {
  while (true) {
    switch (context.prev = context.next) {
      case 0:
        context.next = 1
        return 1
      case 1:
        context.next = 2
        return 2
      case 2:
        context.next = 3
        return 3
      case 3:
        context.stop()
        return 100
      default:
    }
  }
}
let gen = function() {
  const context = {
    prev: 0, // 当前要运行的
    next: 0, // 下一次要访问的
    done: false, // 本次访问结果
    stop() {
      this.done = true
    }
  }
  return {
    next() {
      return {
        value: gen$(context), //将上下文传入,
        done: context.done
      }
    }
  }
}
let it = gen()
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());