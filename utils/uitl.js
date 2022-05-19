const path = require('path');
const fs = require('node:fs/promises');
const ejs = require('ejs');

const absolutePath = path.resolve(__dirname, '..');

// 是否为window环境
const isWindowEnv = () => {
  return process.platform === 'win32'
}
// 获取ejs编译模板
const getEjsTemplate = (dirName) => {
  const regExp = new RegExp(`^${dirName}`);
  const tplDir = path.resolve(absolutePath, './template');
  const files = matchDir(tplDir, regExp, true);

  return files;
}
// 匹配文件
const matchFile = (rootDirPath, regExp, deep = false) => {
  const init = async (dirPath) => {
    const matchFile = [];
    const names = await fs.readdir(dirPath);
    const fileList = names.filter(async (item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = await fs.stat(itemPath);
      return stats.isFile();
    });
    const dirList = names.filter(async (item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = await fs.stat(itemPath);
      return stats.isDirectory();
    });

    fileList.forEach(async (item) => {
      const itemPath = path.resolve(dirPath, item);
      const isMatch = regExp.test(item);
      if (isMatch) {
        matchFile.push({
          absolutePath: itemPath,
          fileBuffer: await fs.readFile(itemPath),
          filename: item
        })
      }
    })

    if (deep) {
      dirList.forEach(async (item) => {
        const itemPath = path.resolve(dirPath, item);
        matchFile.push(...await init(itemPath));
      })
    }
    return matchFile;
  }
  return init(rootDirPath);
}
// 匹配特定目录下的所有文件
const matchDir = (rootDirPath, regExp, deep) => {
  const init = (dirPath) => {
    const names = fs.readdirSync(dirPath);
    const dirList = names.filter((item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = fs.statSync(itemPath);
      return stats.isDirectory();
    });

    const matchDir = dirList.find((item) => regExp.test(item));

    if (matchDir) {
      // 获取目录下所有文件
      const itemPath = path.resolve(dirPath, matchDir);
      return matchFile(itemPath, /\.*/g, true);
    } else if (deep) {
      return dirList
        .map((item) => {
          const itemPath = path.resolve(dirPath, item);
          return init(itemPath)
        })
        .flat(Infinity);
    } else {
      return []
    }
  }
  return init(rootDirPath);
}
// 写入文件
const writeFile = (fileObj, templateString) => {
  const existDir = fs.readdirSync(process.cwd());
  console.log('data', data);
}

module.exports = {
  isWindowEnv,
  getEjsTemplate,
  writeFile
}
