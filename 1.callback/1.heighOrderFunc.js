// 装饰器模式

// 核心代码
function core(a,b,c) {

  console.log('core...',a,b,c);
}
//基于核心代码进行封装 传入一个函数返回一个新函数

Function.prototype.before = function (beforeFn) {
  // this 指当前的实例 即core 
  console.log(this);
  return (...args) => { // ...args 展开运算符
    beforeFn()
    this(...args); // 箭头函数中没有this没有arguments 没有prototype
  }
}
let newFn = core.before(() => {
  console.log('core before');
})
newFn(1,2,3)
