const program = require("commander");

const {create, remove, addComponent} = require('./action');

const index = () => {
  // 指令名称及参数
  program
    .command('create <project-name>')
    .description('创建文件目录')
    .action(create);

  // 添加组件
  program
    .command('addcpn <component-name>')
    // .addArgument(new program.Argument('[type]').choices(['fn', 'class']))
    .description('在当前目录新建组件；例：nice addcpn <name>')
    .action(addComponent);
}

module.exports = index;
