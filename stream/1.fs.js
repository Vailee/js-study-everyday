const fs = require('fs')
const path = require('path')
let rs = fs.createReadStream(path.resolve(__dirname, './text.txt'), {
  flags: 'r', //创建可读流的标识是r 读取文件
  encoding: null, //编码默认 null buffer
  autoClose: true,
  start: 0,
  end: 4, // 包前包后
  highWaterMark: 2, // 12 23 4
})
console.log(rs);