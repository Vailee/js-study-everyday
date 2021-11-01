const eventEmitter = require('events')
const fs = require('fs')
class ReadStream extends eventEmitter {
  constructor(path, option = {}) {
    super()
    this.path = path
    this.flags = option.flags || 'r'
    this.encoding = option.encoding || null
    this.autoClose = option.autoClose || null
    this.start = option.start || 0
    this.end = option.end
    this.highWaterMark = option.highWaterMark || 64 * 1024
    this.flowing = false //pause resume 开关
    this.open()
    // 用户监听了data事件才需要读取
    this.on('newListener', function(type) {
      console.log(type);
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
    this.offset = this.start

  }
  resume() {
    if (!this.flowing) {
      this.flowing = true
      this.read()
    }
  }
  pause() {
    this.flowing = false
  }
  read() {
    // 需要在open之后拿到fd
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    console.log(this.fd);
    const buffer = Buffer.alloc(this.highWaterMark)
    // 文件读取内容 ，每次读取this.highWaterMark个
    // 
    let howMuchToRead = this.end ? Math.min(
      this.end - this.offset + 1, this.highWaterMark
    ) : this.highWaterMark

    fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => {
      if (bytesRead) {
        this.offset += bytesRead
        this.emit('data', buffer.slice(0, bytesRead))
        if (this.flowing) {

          this.read()
        }
      } else {
        this.emit('end')

      }
    })
  }
  destroy(err) {
    this.emit('error', err)
    if (this.autoClose) {
      fs.close(this.fd, () => this.emit('close'))

    }
  }
  open() {
    // 这里是异步的
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy(err)
      }
      this.fd = fd
      this.emit('open', fd)
      this.emit('open', fd)
    })
  }
  pipe(ws) {
    this.on('data', (data) => {
      let flag = ws.write(data)
      if (!flag) {
        this.pause()
      }
    })
    ws.on('drain', () => {
      this.resume()
    })
  }
}
module.exports = ReadStream