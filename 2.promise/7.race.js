// all 一个失败全失败
// race 采用跑到快的作为结果
// allSettled 既要成功也要失败
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000);
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err')
  }, 2000);
})
// Promise.allSettled([p1, p2]).then(
//   data => {
//     console.log(data);
//   }
// )

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let currentVal = promises[i]
      if (currentVal && typeof currentVal.then === 'function') {
        currentVal.then(resolve, reject)
      } else {
        resolve(currentVal)
      }
    }
  })
}
Promise.race([p1, p2, 1]).then(data => {
  console.log(data);
})