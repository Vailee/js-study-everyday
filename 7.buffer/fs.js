// 和文件相关的方法 文件 文件夹
// 1.同步 2.异步（没有sync）
// 如果我们是读文件，读取到的结果默认都是buffer类型
const fs = require('fs')
const path = require('path')
// 写入的时候 会清空文件内容 并且以utf8格式类型写入
// fs.readFile(path.resolve(__dirname, 'test.png'), 'base64', function(err, data) {
//   // console.log(data.toString());
//   // flag r=>read w=>write a=>append
//   fs.writeFile(path.resolve(__dirname, 'test1.png'), data, {
//     flag: 'w'
//   }, function() {
//     console.log('copy');
//   })
// })
// 读取的内容放到内存中 如果文件过大会浪费内存 64k以上文件尽量不使用readFile 使用appendFile

// 手动读写文件 fs.open fs.write fs.close
let buf = Buffer.alloc(3)
fs.open(path.resolve(__dirname, 'a.txt'), 'r', function(err, fd) {
  fs.read(fd, buf, 0, 3, 0, function(err, bytesRead) {
    console.log(buf);
    // 将buffer的数据从0开始 读取3个 写入到文件的0 的位置
    fs.open(path.resolve(__dirname, 'b.txt'), 'w', function(err, wfd) {
      fs.write(wfd, buf, 0, 3, 0, function(err, witten) {
        console.log(witten);
        // 内部需要递归
        fs.close(wfd, () => {})
        fs.close(fd, () => {})
      })
    })
  })
})