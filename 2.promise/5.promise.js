// let fs = require('fs').promises

// // fs.readFile('./1.callback/test1.txt', 'utf8').then(data => {
// //   console.log(data);
// // })
// // fs.readFile('./1.callback/test2.txt', 'utf8').then(data => {
// //   console.log(data);
// // })
// let getTest1 = fs.readFile('./1.callback/test1.txt', 'utf8')
// let getTest2 = fs.readFile('./1.callback/test2.txt', 'utf8')

// function isPromise(params) {
//   return typeof params.then === 'function'
// }
// Promise.all = function(promises) {
//   return new Promise((resolve, reject) => {
//     let result = []
//     let times = 0

//     function processData(index, val) {
//       result[index] = val
//       // if (result.length===promises.length) { // 会有空值混入其中
//       if (++times === promises.length) {
//         resolve(result)
//       }
//     }
//     for (let i = 0; i < promises.length; i++) {
//       let p = promises[i]
//       if (isPromise(p)) {
//         p.then((data) => {
//           processData(i, data)
//         })
//       } else {
//         processData(i, p) //普通值
//       }
//     }
//   })
// }

// Promise.all([getTest1, getTest2]).then(data => {
//   console.log(data);
// })

// Promise.prototype.finally 不是try catch finally
Promise.prototype.finally = function(callback) {
  return this.then((data) => {
    // 函数执行 内部会调用方法，如果方法是promise 需要等待它完成
    return Promise.resolve(callback()).then(() => data)
  }, err => {
    return Promise.resolve(callback()).then(() => {
      throw err
    })
  })
}
Promise.resolve(123).finally(() => { // 这里传入函数 无论如何都会执行
  console.log('finally');

  // finally可以返回一个promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('ok')
      reject('err')
    }, 5000);
  })
}).then(data => {
  console.log(data);
}, err => {
  console.log(err);
})