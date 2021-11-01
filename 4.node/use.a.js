let res = require('./a') // 可以存放相对 绝对路径 可以省略后缀
console.log(res);
// 读取a文件 ，拿到a文件的内容 进行函数包裹 module.exports = 'hello '
/**
 * 
 * function (exports,module,require,__dirname,__filename) {
 * module.exports = 'hello '
 * return module.exports 
 * }(exports,module,require,__dirname,__filename)
 * 
 */

// 代码调试
// node --inspect-brk use.a.js 
// chrome://inspect/