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
    const resolve = (val) => {
      if (this.state===STATUS.PENDING) {
        this.state = STATUS.FULFILLED
        this.value = val
      }
    }
    const reject = (reason) => {
      if (this.state===STATUS.PENDING) {
        this.state = STATUS.REJECTED
        this.reason = reason
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
  }
}
module.exports = Promise