const program = require("commander");

const {create, remove, addComponent} = require('./action');

const index = () => {
  program
    .command('create <project-name>') // 指令名称及参数
    .description('创建文件目录') // 描述
    .action(create); // source表示传入project的参数

  program
    .command('addCpn') // 添加函数组件
    .addArgument(new program.Argument('<drink-size>').choices(['fn', 'class']))
    .description('在当前目录新建组件')
    .action(addComponent);



}

module.exports = index;
