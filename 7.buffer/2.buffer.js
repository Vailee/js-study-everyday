// buffer的声明方式
// 固定大小 不能随意更改
const buffer = Buffer.alloc(6) // 声明了6个字节
console.log(buffer);
const buffer1 = Buffer.from('中国')
console.log('buffer1', buffer1);
const buffer2 = Buffer.from([1, 2, 3, 4, 5, 100])
console.log(buffer2);
// 扩容 创建一个新的把旧的拷贝过去
const buf = Buffer.alloc(6)
const buffer3 = Buffer.from('中')
const buffer4 = Buffer.from('国')
buffer3.copy(buf, 0, 0, 3)
buffer4.copy(buf, 3, 0, 3)
console.log('buf', buf);