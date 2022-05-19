const util = require('util');
const program = require('commander');
const download = util.promisify(require('download-git-repo'));
const ora = require('ora');
/** 通过util.promisify()包裹
 * 将原本的回调形式，转换为支持promise形式的语法
 * */
const {isWindowEnv, compileTemplate} = require('./../../utils/uitl');
const {reactRepo} = require('./../config/repo');
const {commandSpawn} = require('./../../utils/terminal')

const create = async (projectName) => {
  // clone下载项目
  await download(reactRepo, projectName, {clone: true});

  // 进入执行npm install
  await commandSpawn(
    isWindowEnv() ? 'npm.cmd' : 'npm', // 判断环境处于windows Or linux
    ['install'],
    {
      cwd: `./${projectName}`, // 命令执行的文件夹路径
      stdio: 'inherit', // 通过相应的标准输入输出流传入/传出父进程
    }
  );

  // 运行npm run serve
  console.log('执行npm run serve...');
  // 打开浏览器

}

const addComponent = (componentName, options) => {
  let componentType = '';
  if (options.fn) {
    componentType = 'fn'
  } else if (options.class) {
    componentType = 'class'
  }
  console.log('componentType', componentType);
  const files = compileTemplate(componentType)
  console.log(files);
}

module.exports = {
  create,
  addComponent
};
