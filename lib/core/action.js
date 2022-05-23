const util = require('util');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const download = util.promisify(require('download-git-repo'));
const inquirer = require('inquirer');
const ora = require('ora');
const ejs = require('ejs');
const {
  isWindowEnv,
  getEjsTemplate,
  verifyExist,
  writeTemplToFile,
  transformFileName
} = require('./../../utils/uitl');
const {reactRepo} = require('./../config/repo');
const terminal = require('./../../utils/terminal');

const absolutePath = path.resolve(__dirname, '../..');

const create = async (projectName) => {
  // clone下载项目
  await download(reactRepo, projectName, {clone: true});
  // 引导选项配置
  const options = await inquirer.prompt([{
    type: 'input',
    name: 'gitlab-ci',
    message: 'gitlab-ci',
  }, {
    type: 'list',
    name: 'main-component-type',
    message: '默认React组件类型',
    choices: ['Function', 'Class'],
  }, {
    type: 'list',
    name: 'css-type',
    message: 'css模块',
    choices: ['styled-component', 'css modules', 'none'],
  }, {
    type: 'list',
    name: 'globalStore',
    message: 'global-store',
    choices: ['mobox', 'react-redux', 'eventBus'],
  }])
  console.log('options', options);
  // 写入配置文件
  await writeTemplToFile(
    path.resolve(absolutePath, './template/configs/nice.config.ejs'),
    path.resolve(process.cwd(), `./${projectName}`),
    {}
  );
  const npm = isWindowEnv() ? 'npm.cmd' : 'npm';

  // 进入执行npm install
  await terminal.spawn(npm, ['install'], {
    cwd: `./${projectName}`, // 命令执行的文件夹路径
    stdio: 'inherit', // 通过相应的标准输入输出流传入/传出父进程
  });

  // 运行npm run serve
  await terminal.spawn(npm, ['run', 'start'], {
    cwd: `./${projectName}`,
    stdio: 'inherit'
  });
}

const addComponent = async (componentName, type = 'fn') => {
  // 获取输入命令行上下文的文件目录路径
  const targetDir = path.resolve(process.cwd(), componentName);
  // 验证文件/目录是否存在
  const isExist = verifyExist(targetDir);

  if (isExist) return;

  // 创建文件目录
  fs.mkdirSync(targetDir);

  const files = getEjsTemplate(`${type}-component`);

  for (let item of files) {
    const {absolutePath, filename} = item;

    // 编译ejs模板
    ejs.renderFile(absolutePath, {}, {}, (er, res) => {
      if (er) {
        return console.log(er);
      }

      const name = transformFileName(filename);
      writeTemplToFile(
        targetDir,
        name,
        res
      )
    })
  }

  console.log('创建完成');
}

module.exports = {
  create,
  addComponent
};
