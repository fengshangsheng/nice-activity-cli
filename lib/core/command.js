const program = require("commander");

const {create, remove, addComponent} = require('./action');

const index = () => {
  // 指令名称及参数
  program
    .command('create <project-name>')
    .description('创建文件目录') // 描述
    .action(create); // source表示传入project的参数

  // 添加组件
  program
    .command('addcpn <component-name>')
    .addArgument(new program.Argument('[type]').choices(['fn', 'class']))
    .description('在当前目录新建组件；例：nice addcpn <name> fn')
    .action(addComponent);
}

module.exports = index;
