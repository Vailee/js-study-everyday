const fs = require('fs')
const path = require('path')

const ReadStream = require('../7.buffer/ReadStream-bin')
const WriteStream = require('../stream/writeSteam_bin')
// const rs = fs.createReadStream(path.resolve(__dirname, '../a.txt'), {
//   highWaterMark: 4
// })
// const ws = fs.createWriteStream(path.resolve(__dirname, '../b.txt'), {
//   highWaterMark: 1
// })
const rs = new ReadStream(path.resolve(__dirname, '../a.txt'), {
  highWaterMark: 4
})
const ws = new WriteStream(path.resolve(__dirname, '../b.txt'), {
  highWaterMark: 1
})

rs.pipe(ws)
// rs.on('data', function(data) {
//   let flag = ws.write(data)
//   if (!flag) {
//     rs.pause()
//   }
// })
// ws.on('drain', function() {
//   rs.resume()
// })