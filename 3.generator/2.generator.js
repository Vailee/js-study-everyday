// 用法
let fs = require('fs').promises

function* read() {
  let text1 = yield fs.readFile('./3.generator/test1.txt', 'utf8')
  console.log('---', text1);
  let text2 = yield fs.readFile(text1, 'utf8')
  return text2
}
// let it = read()
// let {
//   value,
//   done
// } = it.next() // 第一次穿参无意义
// console.log(value, done);
// value.then(data => {
//   // console.log(data);
//   let {
//     value,
//     done
//   } = it.next(data)
//   value.then(data => {
//     console.log(data);
//     let {
//       value,
//       done
//     } = it.next(data)
//     console.log(value, done);
//   })
// })

function co(it) { //  同步迭代 采用for ，异步迭代 采用函数的方式
  return new Promise((resolve, reject) => {
    function step(data) {
      let {
        value,
        done
      } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(data => {
          step(data)
        }, reject)
      } else {
        resolve(value) // 将最终的结果抛出去
      }
    }
    step()
  })


}
co(read()).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
})