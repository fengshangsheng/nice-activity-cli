const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const absolutePath = path.resolve(__dirname, '..');

// 是否为window环境
const isWindowEnv = () => {
  return process.platform === 'win32'
}

// 编译模板
const compileTemplate = (templateType) => {
  const regExp = new RegExp(`^${templateType}-component`);
  const tplDir = path.resolve(absolutePath, './template');
  const files = matchDir(tplDir, regExp, true);

}

// 匹配目录中的文件
const matchFile = (rootDirPath, regExp, deep = false) => {
  const init = (dirPath) => {
    const matchFile = {};
    const names = fs.readdirSync(dirPath);
    const fileList = names.filter((item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = fs.statSync(itemPath);
      return stats.isFile();
    });
    const dirList = names.filter((item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = fs.statSync(itemPath);
      return stats.isDirectory();
    });

    fileList.forEach((item) => {
      const itemPath = path.resolve(dirPath, item);
      const isMatch = regExp.test(item);
      if (isMatch) {
        matchFile[item] = fs.readFileSync(itemPath)
      }
    })

    if (deep) {
      dirList.forEach((item) => {
        const itemPath = path.resolve(dirPath, item);
        matchFile[item] = init(itemPath);
      })
    }
    return matchFile;
  }
  return init(rootDirPath);
}
// 匹配目录中的子目录中的文件
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
      return dirList.map((item) => {
        const itemPath = path.resolve(dirPath, item);
        return init(itemPath);
      })
    } else {
      return {}
    }
  }
  return init(rootDirPath);
}

module.exports = {
  isWindowEnv,
  compileTemplate
}
