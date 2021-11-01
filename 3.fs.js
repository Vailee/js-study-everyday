// // 异步递归创建
// const fs = require('fs');

// // mkdir mkdirSync

// // 创建目录需要一层层的创建 直接'a/b/c/d' 不行，所以需要遍历
// // fs.mkdir('a/b/c/d', (err) => {
// //   if(err) return console.log(err);
// //   console.log('success');
// // })

// function mkdir(pathStr, cb) {
//   let pathList = pathStr.split('/')
//   let index = 1;

//   function make(err) {
//     if (err) {
//       return cb(err)
//     }
//     if (index === pathList.length + 1) return cb()
//     let currentPath = pathList.slice(0, index++).join('/')
//     // make()
//     // console.log(currentPath);
//     // success
//     // a/b/c/d
//     // a/b/c
//     // a/b
//     // a
//     // fs.stat表示文件的状态，如果不存在，就发生错误
//     fs.stat(currentPath, function(err) {
//       if (err) {
//         fs.mkdir(currentPath, make)
//       } else {
//         make()
//       }
//     })

//   }
//   make()
// }

// mkdir('a/b/c/d', (err) => {
//   if (err) return console.log(err);
//   console.log('success');
// })


//promise 创建
// const fs = require('fs').promises
// const {
//   existsSync
// } = require('fs')

// async function mkdir(pathStr) {
//   let pathList = pathStr.split('/')

//   for (let i = 1; i <= pathList.length; i++) {
//     let currentPath = pathList.slice(0, i).join('/')
//     if (!existsSync(currentPath)) {
//       await fs.mkdir(currentPath)
//     }
//   }
// }

// mkdir('a/b/c/d').then(() => {
//   console.log('success');
// }).catch((err) => {
//   console.log(err);
// })


// 删除目录

const fs = require('fs')
const path = require('path')

// fs.rmdir fs.rmdirSync
// fs.stat 文件状态 文件信息 isFile isDirectory 判断是不是文件夹
// fs.unlink 删除文件
// fs.readdir('a', function(err, dirs) {
//   console.log(dirs);
// })
// fs.stat('a', function(err, statObj) {
//   if (statObj.isFile()) {
//     fs.unlink()
//   }
//   console.log();
// })
// fs.rmdir('a', function(err) {
// })

//先序遍历 遇到节点就先处理左边 深度先序

function rmdir(pathList, cb) {
  fs.stat(pathList, function(err, statObj) {
    if (statObj.isDirectory()) {
      fs.readdir(pathList, function(err, dirs) {
        dirs = dirs.map(item => path.join(pathList, item))
        console.log(dirs);
        // 把目录里边的拿出来 1个删除后删第二个
        let index = 0;

        function step() {
          // 儿子删完后 删除自己
          if (index === dirs.length) return fs.rmdir(pathList, cb)
          rmdir(dirs[index++], step)
        }
        step()
      })
    } else {
      // 如果是文件直接删除
      fs.unlink(pathList, cb)
    }
  })
}
rmdir('a', function() {
  console.log('success');
})