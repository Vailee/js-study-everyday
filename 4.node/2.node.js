// Node中的全局对象  global

// 默认我们访问是在文件中访问的this 内部被更改了 所以不是global 而是 module.exports
// console.log(this); //{}
// function a() {
//   console.log(this); // global
// }
// a()

// 全局变量是可以直接在文件中不声明直接访问的变量，但是global上的属性叫全局变量

// console.log(process); //进程里用到最多的几个变量 platform chdir cwd env argv nextTick
// platform 
// 平台 区分操作系统 win32 drawin
// 根据不同平台操作系统文件
// cwd current working directory
// 获取当前执行node命令目录 可以找到当前目录下的某个文件
// chdir 修改某个文件到其他路径

// env 当前系统的环境变量 根据不同的环境变量做配置
// 设置环境变量 win set xxx = xxx / mac export xxx=xxx
// 不区分操作系统 cross-env 一个第三方模块用于设置环境变量

// argv 运行代码时传入的参数 --port --config
// 可以获取到当前用户所有的传入参数
// console.log(process.argv.slice(2));
// // node 2.node.js --port 3000 --config xxx.js 
// let config = process.argv.slice(2).reduce((memo, current, index, arr) => {
//   if (current.startsWith('--')) {
//     memo[current.slice(2)] = arr[index + 1]
//   }
//   return memo
// }, {})
// console.log(config); //{ port: '3000', config: 'xxx.js' }

// commander 

// const program = require('commander') //解析用户传递的参数
// program.name('abcd')
// program.usage('[options]')
// program.createOption('rm', () => {
//   console.log('删除');
// })
// program.option('-p, --port <v>', 'set server port')
// program.parse(process.argv)
// console.log(program.port);

// node中有多个红任务队列

// process.nextTick() //微任务 
// timers 定时器 
// poll 轮询 会在特定的时候进行阻塞 执行i/o回调 fs
// check setImmediate 每个宏任务执行完毕 都会清空微任务

// 先清空栈底 process.nextTick() 清空微任务 进到宏任务
setTimeout(() => { // 宏任务
  console.log('timeout');
}, 0);
Promise.resolve().then(() => { //微任务
  console.log('promise');
})
process.nextTick(() => { // 微任务 当前执行栈中执行完毕后，立即调用的，比微任务级别高
  console.log('nextTick');
})