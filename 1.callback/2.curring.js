// 柯里化 也是一个高阶函数

//判断元素类型 typeof constructor  instancof（实例） Object.prototype.toString.call()
function isType(typing) {
  return function(val) {
    return Object.prototype.toString.call(val)===`[object ${typing}]`
  }
}
let utils = {};
['String', 'Number', 'Boolean'].forEach(method => {
  utils[`is${method}`]=isType(method)
})
console.log(utils.isNumber(123))

// 通用的柯里化函数
function sum(a,b,c,d,e) {
  return a+b+c+d+e
}
const curring = (fn, arr = []) => { // arr就是要收集每次调用时传入的参数
  let len = fn.length // 函数的长度就是参数的个数
  return function (...args) {
    let newArgs = [...arr, ...args]
    if (newArgs.length === len) {
      return fn(...newArgs)
    } else {
      return curring(fn, newArgs)
    }
  }
  
}
let newSum = curring(sum)
newSum(1)(2)(3)(4)(5)
// 偏函数
newSum(1,2)(3)(4)(5)