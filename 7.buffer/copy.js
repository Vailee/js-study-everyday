// 手动读写文件 fs.open fs.write fs.close 实现读取一点 写入一点

// 参照物 内存 要将一个文件的内容读到内存中 其实是做了写的操作

const path = require('path')
const fs = require('fs');
const {
  ReadStream
} = require('tty');

function copy(source, target, cb) { // 使用三个字节拷贝数据
  const BUFFER_SIZE = 3;
  let R_OFFSET = 0;
  let W_OFFSET = 0;
  const buffer = Buffer.alloc(BUFFER_SIZE)
  // w 写入 r 读取 a 追加 r+ 以读取为准可以写入 w+以写入为准可以执行读取
  fs.open(path.resolve(__dirname, source), 'r', 0o666, function(err, rfd) {
    console.log(rfd);
    fs.open(path.resolve(__dirname, target), 'w', 0o666, function(err, wfd) {
      function next() {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, R_OFFSET, function(err, bytesRead) {
          //z真正读取到的个数
          if (err) return cb(err)
          if (bytesRead) {
            fs.write(wfd, buffer, 0, bytesRead, W_OFFSET, function(err, written) {
              R_OFFSET += bytesRead;
              W_OFFSET += written
              next()
            })
          } else {
            fs.close(rfd, () => {})
            fs.close(wfd, () => {})
            cb('success')
          }
        })
      }
      next()
    })
  })
}

// ways 2 发布订阅
// readStream.js

copy('a.txt', 'b.txt', function(err, data) {
  if (err) {
    return console.log(err);
  }
  console.log('success');
})