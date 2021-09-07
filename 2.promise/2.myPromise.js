const STATUS = {
  PENDING:'PENDING',
  FULFILLED:'FULFILLED',
  REJECTED:'REJECTED',
}
class Promise{
  constructor(executor) {
    this.state = STATUS.PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks=[] // 存放成功的回调
    this.onRejectedCallbacks=[] // 存放失败的回调
    const resolve = (val) => {
      if (this.state===STATUS.PENDING) {
        this.state = STATUS.FULFILLED
        this.value = val
        // 发布
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    const reject = (reason) => {
      if (this.state===STATUS.PENDING) {
        this.state = STATUS.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
      
      
    }
    try {
      executor(resolve,reject)
    } catch (e) {
      reject(e)
    }
    
  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === STATUS.FULFILLED) {
        try {
          let x = onFulfilled(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }   
    }
    if (this.state === STATUS.REJECTED) {
      // let x = onRejected(this.reason)
      // resolve(x)
      try {
        let x = onRejected(this.value)
        resolve(x)
      } catch (error) {
        reject(error)
      }   
    }
    if (this.state === STATUS.PENDING) {
      // 装饰器模式
      this.onResolvedCallbacks.push(()=>{
        // let x = onFulfilled(this.value)
        // resolve(x)
        try {
          let x = onFulfilled(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }   
      })
      this.onRejectedCallbacks.push(()=>{
        // let x = onRejected(this.reason)
        // resolve(x)
        try {
          let x = onRejected(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        } 
      })
    }
    })
    
    return promise2
  }
}
module.exports = Promise