let fs = require('fs').promises
async function read() {
  let text1 = await fs.readFile('./3.generator/test1.txt', 'utf8')
  console.log('---', text1);
  let text2 = await fs.readFile(text1, 'utf8')
  return text2
}
// async 方法执行后返回的是一个promise generator语法糖
read()