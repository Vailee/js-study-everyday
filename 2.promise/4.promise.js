const Promise = require('./4.myPromise')
const fs = require('fs')

function read(...args) {
  // 延长调用
  let dfd = Promise.defer()
  fs.readFile(...args, function(err, data) {
    if (err) {
      return dfd.reject(err)
    }
    dfd.resolve(data)
    // reject()
  })

  return dfd.promise
}
read('./1.callback/test1.txt', 'utf8').then(data => {
  console.log(data);
})