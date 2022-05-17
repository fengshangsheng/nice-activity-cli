### 初始化

- `npm init -y`生成package.json文件
- 创建index.js文件，首行编写`#!/usr/bin/env node`
- package.json添加`"bin":{"nice": "index.js"}`
- 命令行执行`npm link`, 将bin的`nice`指令链接至系统的环境变量中

> 至此命令行输入`nice`，就会执行index.js文件
***

1. `npm install commander`安装指令工具包;[配置 ](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)
2. index.js引入工具包;`const program = require('commander');`
3. 添加查看版本号指令
    ```
    const packageJSON = require('./package.json'); 
    program.version(require('./package.json').version, '-v', '输出版本号');
    // 在命令行输入`nice -v`，可查看当前版本号；
    ```
4.



