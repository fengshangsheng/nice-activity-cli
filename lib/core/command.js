const program = require("commander");

const {create,remove} = require('./action');

const index = () => {
  program
    /** 指令名称及参数 */
    .command('create <project>')
    /** 描述 */
    .description('创建文件目录')
    /** source表示传入project的参数 */
    .action(create)

  program
    /** 指令名称及参数 */
    .command('remove <project> [params...]')
    /** 描述 */
    .description('remove 一个对象')
    /**
     * source表示project;
     * parmas:表示指令中另一个可选参数
     * */
    .action(remove)
}

module.exports = index;
