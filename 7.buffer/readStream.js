// 可读流 可以控制读取的个数和速率
// fs 基于stream模块底层扩展了一个文件读写方法
const fs = require('fs')
const path = require('path')
const ReadStream = require('./ReadStream-bin')
// let rs = fs.createReadStream(path.resolve(__dirname, 'a.txt'), { // 创建可读流 一般情况不用自己传参数
//   flags: 'r',
//   encoding: null,
//   autoClose: true,
//   emitClose: true,
//   start: 0,
//   highWaterMark: 3 //每次读取的数据个数 ，默认64K 
// })

let rs = new ReadStream(path.resolve(__dirname, 'a.txt'), { // 创建可读流 一般情况不用自己传参数
  flags: 'r',
  encoding: null,
  autoClose: true,
  emitClose: true,
  start: 0,
  end: 4,
  highWaterMark: 3 //每次读取的数据个数 ，默认64K 
})
// console.log(rs);
// 监听用户绑定的data事件 触发对应的回调，不停的触发
rs.on('open', function(fd) {
  console.log(fd);
})
rs.on('data', function(chunk) {
  console.log(chunk);
  rs.pause() //暂停流
})
rs.on('end', function() { //文件读取完毕会触发end事件
  console.log('end');
})
rs.on('close', function() { //先end 再close autoClose: true时候触发
  console.log('close');
})

// setInterval(() => {
//   rs.resume() // 恢复暂停的流，再次触发data事件
// }, 2000);