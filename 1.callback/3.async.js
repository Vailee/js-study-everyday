const fs = require('fs')

let obj = {}
function after(times,callback) {
  return function (params) {
    --times === 0 && callback()
  }
}
let fn = after(2, () => {
  console.log(obj);
})

// 异步处理都是基于回调,异步不能通过try catch捕获异常
fs.readFile('test1.txt','utf8',function (err,data) {
  // console.log(data);
  obj.test1 = data
  fn()
})
fs.readFile('test2.txt','utf8',function (err,data) {
  // console.log(data);
  obj.test2 = data
  fn()
})

