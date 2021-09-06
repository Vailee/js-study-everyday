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
    if (this.state === STATUS.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.state === STATUS.REJECTED) {
      onRejected(this.reason)
    }
    if (this.state === STATUS.PENDING) {
      // 装饰器模式
      this.onResolvedCallbacks.push(()=>onFulfilled(this.value))
      this.onRejectedCallbacks.push(()=>onRejected(this.reason))
    }
  }
}
module.exports = Promise