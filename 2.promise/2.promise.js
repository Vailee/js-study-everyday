// 链式调用
const fs = require('fs')
// fs.readFile('../test1.txt', 'utf8', (err, data) => {
//   fs.readFile('../test2.txt', 'utf8', (err, data) => {
//     console.log(data);
//   })
// })

function read(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function(err, data) {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}
// read('./1.callback/test1.txt', 'utf8').then(data => {
//   console.log(data);
// }, err => {
//   console.log(err);
// })
// promise的链式调用问题
// 如果then方法中（成功或失败） 返回的不是一个promise 会将这个值传递给外层下一次then的成功结果
// 如果执行then方法中的方法出错了 抛出异常 ,会将失败结果传给下一层失败结果
// 如果返回的是promise 会用这个promise的结果作为下一次then的成功或失败

// 出错会失败 返回的promise会出错 ，其他情况都成功
read('./1.callback/test1.txt', 'utf8').then(data => {
    console.log(data);
    // return 100;
    // throw new Error('err')
    return read(data, 'utf8')
  }, err => {
    console.log(err);
  })
  .then(data => {
    console.log('s:', data);
  }, (err) => {
    console.log('f:', err);
  }).catch(err => {
    console.log(err);
  })