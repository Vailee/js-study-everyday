// 订阅 发布模式 先订阅后发布
const fs = require('fs')
let eventObj = {
  arr: [], //中介存放订阅事件
  on(fn) { //订阅 ----》买家
    this.arr.push(fn)
  },
  emit() { //发布 ----》卖家
    this.arr.forEach(fn => fn())
  }
}
let obj = {}
fs.readFile('test1.txt', 'utf8', function(err, data) {
  // console.log(data);
  obj.test1 = data
  eventObj.emit() // 触发方法
})
fs.readFile('test2.txt', 'utf8', function(err, data) {
  // console.log(data);
  obj.test2 = data
  eventObj.emit() // 触发方法
})

eventObj.on(() => { // 注册方法
  if (Object.keys(obj).length === 2) { // 买的鞋子到货啦 
    console.log('数据读取回来了 ', obj);

  }
})
// eventObj.on(() => {
//   console.log('readFile 成功 ');
// })