// abort 方法就是不要promise这次成功的结果了


// 超时处理
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 3000);
})

function wrap(p1) {
  let abort
  let p2 = new Promise((resolve, reject) => { // 空的resolve
    abort = reject
  })
  let newP = Promise.race([p1, p2])
  newP.abort = abort
  return newP
}

// 实现思路 p1.abort= reject 用warp包裹
let p2 = wrap(p1)

p2.then(data => {
  console.log('data', data);
}).catch(err => {
  console.log('err', err);
})
setTimeout(() => {
  // 如果超过2s 就让promise 失败掉
  p2.abort()
}, 2000);