const p = new Promise((resolve, reject) => {
  resolve('ok')
}).then().then().then((data) => {
  console.log(data);
})