#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('./package.json');

// 查看版本号
program.version(packageJSON.version, '-v, --vesion', '输出版本号');

// 添加自己options，可通过--help查看
program.option('-a --addzz <filepath>', '在指定目标路径创建文件目录; 例：nice -add /src/compoents/home')
  .hook('preAction', (thisCommand, actionCommand) => {
    console.log('hook-----------------');
  })
  .action((name, options, command) => {
    console.log('action---------------', name);
  })
  .on('option:addzz', function (filepath) {
    console.log('option:filepath------------', filepath);
  });


program.parse();


const options = program.opts();
console.log('========2=====options', options);
