const program = require("commander");

const {create,remove} = require('./action');

const index = () => {
  program
    /** 指令名称及参数 */
    .command('create <project-name>')
    /** 描述 */
    .description('创建文件目录')
    /** source表示传入project的参数 */
    .action(create)

}

module.exports = index;
