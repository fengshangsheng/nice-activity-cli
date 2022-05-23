const program = require("commander");
const packageJSON = require("./../../package.json");

const index = () => {
  // 查看版本号
  program.version(packageJSON.version, '-v, --vesion', '输出版本号');
}

module.exports = index;
