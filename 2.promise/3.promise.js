const Promise = require('./3.myPromise')
const p = new Promise((resolve, reject) => {
  resolve('ok')
}).then().then().then((data) => {
  console.log(data);
})