// 事件环 --> 代码的执行顺序
// 计算机里调度任务和分配任务的单位是进程
// 进程中包含着很多线程
// 浏览器是多进程模型 每个页签是一个进程

// 主要 渲染进程 - 线程
// js的主线程是单线程   UI渲染 和 js 共用线程
// 事件 定时器 ajax 都是包含在进程中
// webworker 工作线程和主线程不平等 （主线程能操作dom）

// 异步方法 1.宏任务 宿主环境提供的异步方法，2.微任务：语言本身提供的 promise.then MutationObserver 
// 整个微任务和宏任务的调度循序
// 默认先清空宏任务 script脚本 ，会清空所有的微任务（全部执行完毕），微任务执行后开始页面渲染（不是每次都渲染），取出一个宏任务执行，执行过程中可能再次产生宏任务，微任务

// 常见宏任务 settimeout ，setImmediate(IE支持)性能比settimeout好 ，messageChannel消息通道 requestFramAnimation script ui i/o 事件 ajax。。。
// 常见微任务 mutationObserver promise.then  process.nextTick(node) queueMicrotask