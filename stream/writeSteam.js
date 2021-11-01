const fs = require('fs')
const path = require('path')
const WriteStream = require('./writeSteam_bin')

const ws = new WriteStream(path.resolve(__dirname, '../a.txt'), {
  highWaterMark: 5
})

// const ws = fs.createWriteStream(path.resolve(__dirname, '../a.txt'), {
//   highWaterMark: 3
// })
// ws.write('abc')
// ws.write('def')


let i = 0

function write() {
  let flag = true
  while (i < 10 && flag) {
    flag = ws.write(i++ + '')
    console.log(flag);
  }
}
ws.on('drain', function() { // 只有当我们写入的数据达到了预期 并且数据被清空后才会触发drain 事件
  console.log('写完了');
  write()
})
write()