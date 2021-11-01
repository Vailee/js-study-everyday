包是由多个模块组成的 
 npm init -y 初始化信息文件 
   "license": "ISC"  // MIT 开源
bin 可执行文件

npm link 把当前模块临时放到npm下方便调试使用
`#! /usr/bin/env node`  //使用系统环境下的node
全局包必须增加bin字段 会通过配置做软链 表示node执行 

安装模块（第三方）
  依赖方式 1 开发依赖（webpack） 2项目依赖（vue） 3同版本依赖 4捆绑依赖 5可选依赖

    开发 npm i webpack - D
    生产（项目） npm i jquery -S （新版本可以省略 - S）

    捆绑 npm pack //"bundledDependencies":["xxx"]

常见的版本号 
正式版  ^ 锁定大版本 
alpha beta rc

