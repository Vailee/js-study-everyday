// const fs = require('fs').promises
const fs = require('fs')

// fs.readFile('./README.md', 'utf8').then((data) => {
//   console.log(data);
// })
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

// const read = promisify(fs.readFile)
// read('./README.md', 'utf8').then(data => {
//   console.log(data);
// })

function promisifyAll(target) {
  Reflect.ownKeys(target).forEach(key => {
    target[key + 'Async'] = promisify(target[key])
  })
  return target
}
let obj = promisifyAll(fs)
obj.readFileAsync('./README.md', 'utf8').then(data => {
  console.log(data);
})