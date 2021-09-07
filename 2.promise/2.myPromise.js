const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

function resolvePromise(x, promise2, resolve, reject) {
  // 我等着我给我买包烟。。。
  if (promise2 === x) {
    return reject(new TypeError('出错了'))
  }
  // 看x是普通值还是promise如果是promise要采用其他状态
  // 不是promise 就直接调用
  // console.log(x, promise2, resolve, reject);
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      // x可以是一个对象或者函数
      let then = x.then // 就看一下这个对象是否有then方法
      if (typeof then === 'function') {
        // then是函数 x是一个promise
        // 如果x是promise ，那么就采用他的状态
        then.call(x, function(y) { // 调用返回的promise 用他的结果作为下一次then的结果
          resolve(y)
        }, function(r) {
          reject(r)
        })
      } else {
        resolve(x) // 此时x就是一个普通对象
      }
    } catch (error) {
      reject(error) // 取then时抛出错误
    }

  } else {
    resolve(x) //x 是一个原始数据类型 直接返回resolve
  }
}
class Promise {
  constructor(executor) {
    this.state = STATUS.PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = [] // 存放成功的回调
    this.onRejectedCallbacks = [] // 存放失败的回调
    const resolve = (val) => {
      if (this.state === STATUS.PENDING) {
        this.state = STATUS.FULFILLED
        this.value = val
        // 发布
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.state === STATUS.PENDING) {
        this.state = STATUS.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }


    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }

  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);

      }
      if (this.state === STATUS.REJECTED) {
        // let x = onRejected(this.reason)
        // resolve(x)
        setTimeout(() => {
          try {
            let x = onRejected(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);

      }
      if (this.state === STATUS.PENDING) {
        // 装饰器模式
        this.onResolvedCallbacks.push(() => {
          // let x = onFulfilled(this.value)
          // resolve(x)
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);

        })
        this.onRejectedCallbacks.push(() => {
          // let x = onRejected(this.reason)
          // resolve(x)
          setTimeout(() => {
            try {
              let x = onRejected(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0);

        })
      }
    })

    return promise2
  }
}
module.exports = Promise