// node 的核心模块
// 模块规范有哪些 为什么有这些规范
// 开发时候会有命名冲突 命名空间

// node中的模块 内置模块 自定义模块 第三方模块
// 核心模块 fs path vm require 内部是同步的
const fs = require('fs')
const result = fs.readFileSync('./README.md', 'utf8')
console.log(result);
const bool = fs.existsSync('./README.md')
console.log(bool);

const path = require('path')
// 默认解析的路径是以process.cwd() 当前的工作目录 ，可以用chdir去更改
// __dirname 文件所在的目录

console.log(path.resolve(__dirname, 'README.md')); // 相对路径变绝对路径，有拼接功能

console.log(path.join('a', 'b')); // 只是简单的拼接 ，没有完整路径
console.log(path.extname('a.js')); // .js  取扩展名
console.log(path.dirname(__dirname)); // __dirname = path.dirname

// vm 虚拟机模块
const vm = require('vm')
const a = 100;
const log = 'console.log(a)' // eval 执行时会查找上下文 new Function
// let fn = new Function(log)  // new Function 可以产生一个执行环境 不依赖于外层作用域，必须包一层函数 模版引擎中会这么使用
// fn()
vm.runInContext(log) // 让字符串直接执行 并且在沙箱环境中 