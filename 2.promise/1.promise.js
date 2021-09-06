// 1用法 2生态 3原理

// 解决哪些问题 异步并发（Promise.all） 异步窜行解决回调地狱（链式操作）错误处理方便

// 缺陷 依旧是基于回调函数 =》generator + async + await

// Promise 是一个类 类中的构造函数要传入executor 默认会执行
// executor中有俩个参数 resolve reject
// 默认创建一个promise 默认状态就是 pending->fulfilled rejected
// 调用成功和失败需要传递一个成功的原因或失败的原因
// 如果已经成功就不能失败
// 每一个promise实例都有一个then方法
// 抛出异常按失败处理

const Promise=require('./1.myPromise.js')

let p = new Promise((resolve, reject) => {
  // throw new Error('失败了')
  console.log(1);
  setTimeout(() => {
    resolve(123)
  }, 1000);
  // reject(123)
})
p.then((data) => {
  console.log('success',data);
}, (reason) => {
  console.log('fail',reason);
})
p.then((data) => {
  console.log('success',data);
}, (reason) => {
  console.log('fail',reason);
})
console.log(2);
console.log(p);