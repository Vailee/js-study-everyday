const fs = require('fs')
const path = require('path')
// let ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
//   flags: 'w',
//   encoding: 'utf8',
//   autoClose: true,
//   start: 0,
//   highWaterMark: 3, // 可写流的highWaterMark 和可读流不一样 表示期望用多少内存来写
// })
// ws.on('open', function(fd) {
//   console.log('open', fd);
// })
// ws.on('close', function(fd) {
//   console.log('close', fd);
// })
// let flag = ws.write('1', function() {
//   console.log('write ok');
// }) // 接受字符串或者buffer 异步回调
// console.log('flag', flag); // 比highWaterMark预期小 为true，如果超出预期 会继续写入
// flag = ws.write('1')
// console.log('flag', flag);
// flag = ws.write('123')
// console.log('flag', flag);
// flag = ws.write('456')
// console.log('flag', flag);
// flag = ws.write('789')
// console.log('flag', flag);
// // 我们并发异步操作 串行异步
// // 由于write方法是异步的 所以如果多个write方法同时操作一个文件 就会有出错的情况 除了第一次write 写入文件 ，其他全部排队 第一个完成后 清空缓存区 。如果缓存区过大会导致浪费内存，所以我们会设置一个预期值，来进行控制，达到预期后就不要在调用write方法了

// ws.end() // write +close



const rs = fs.createReadStream(path.resolve(__dirname, 'a.txt'), {
  highWaterMark: 3 // 读取默认 64k
})
const ws = fs.createWriteStream(path.resolve(__dirname, 'b.txt'), {
  highWaterMark: 2 // 写入 默认16k
})

rs.on('data', function(data) {
  console.log(data);
  let flag = ws.write(data)
  if (!flag) {
    console.log('吃不下了，等等');
    rs.pause()
  }
})
ws.on('drain', function() { //目前所有写入的数据都完毕了
  console.log('消化完了，再继续吃');
  rs.resume()
})