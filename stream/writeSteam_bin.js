const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
const Queue = require('./queue')
class WriteStream extends EventEmitter {
  constructor(path, option) {
    super()
    this.path = path
    this.flags = option.flags || 'w'
    this.encoding = option.encoding || 'utf8'
    this.mode = option.mode || 0o666
    this.autoClose = option.autoClose || true
    this.start = option.start || 0
    this.end = option.end
    this.highWaterMark = option.highWaterMark || 16 * 1024

    this.len = 0; // 缓存区大小 用于维持有多少数据没有写入到文件中
    this.needDrain = false
    this.cache = new Queue()
    this.writing = false // 用来表示是否是第一次写入
    this.offset = this.start
    this.open()
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      this.fd = fd
      this.emit('open', fd)
    })
  }
  clearBuffer() {
    let data = this.cache.poll()
    if (data) {
      this._write(data.chunk, data.encoding, data.cb)
    } else {
      this.writing = false
      if (this.needDrain) {
        this.emit('drain')
      }
    }
  }
  write(chunk, encoding = this.encoding, cb = () => {}) {
    // 将数据全部转换成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length // 当数据写入后 需要再手动的将this.len--
    let returnValue = this.len < this.highWaterMark
    this.needDrain = !returnValue

    let userCB = cb
    cb = () => {
      userCB()
      this.clearBuffer()
    }

    if (!this.writing) { // 当前没有正在写入 说明是第一次
      // 需要真正执行写入的操作
      this.writing = true
      // 真正写入
      console.log('真正写入');
      this._write(chunk, encoding, cb)
    } else {
      // 保存到缓存区
      console.log('保存到缓存区');
      this.cache.offer({
        chunk,
        encoding,
        cb
      })
    }



    return returnValue
  }
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.offset += written
      this.len -= written
      cb()
    })

  }
}

module.exports = WriteStream