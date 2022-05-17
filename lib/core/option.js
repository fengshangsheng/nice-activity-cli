const program = require("commander");
const packageJSON = require("./package.json");

const index = () => {
  // 查看版本号
  program.version(packageJSON.version, '-v, --vesion', '输出版本号');

  /** 添加自己options，可通过--help查看
   * <XXX>, 尖括号表示必填参数
   * [XXX], 中括号表示可选参数
   * */
  program.option('-c --create <filepath>', '在指定目标路径创建文件目录; 例：nice -add /src/compoents/home')

  /** on('option:XXXX')，监听执行的执行
   * XXXX必须为指令中的长指令，比如--create才会生效，而监听-c不会生效
   * */
  program.on('option:create', (params) => {
    console.log('on-option:create------------', params);
  });

  /** --help为内置指令，可直接监听 */
  program.on('--help', (params) => {
    console.log('');
    console.log('on-option:help------------', params);
  });
}

module.exports = index;
