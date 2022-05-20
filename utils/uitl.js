const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const absolutePath = path.resolve(__dirname, '..');

/** 是否为window环境
 * @return {boolean}
 */
const isWindowEnv = () => {
  return process.platform === 'win32'
}
/** 获取ejs编译模板
 * @param dirName  获取指定文件夹下的模板
 * @return {[]}
 */
const getEjsTemplate = (dirName) => {
  const regExp = new RegExp(`^${dirName}`);
  const tplDir = path.resolve(absolutePath, './template');
  const files = matchDir(tplDir, regExp, true);

  return files;
}
/** 匹配特定目录下的所有文件
 * @param rootDirPath     开始匹配的文件目录路径
 * @param regExp          匹配的正则表达式
 * @param deep            是否深度匹配
 * @return {[]}
 */
const matchDir = (rootDirPath, regExp, deep = true) => {
  const init = (dirPath) => {
    const names = fs.readdirSync(dirPath);
    // 获取当前目录下的文件目录列表
    const dirList = names.filter((item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = fs.statSync(itemPath);
      return stats.isDirectory();
    });
    // 当前目录下，是否存在匹配的文件目录
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
/** 匹配文件
 * @param rootDirPath     开始匹配的文件目录路径
 * @param regExp          匹配的正则表达式
 * @param deep            是否深度匹配
 * @return return file[] : {
 *   absolutePath: itemPath,
 *   fileBuffer: fs.readFileSync(itemPath),
 *   filename: item
 * }
 */
const matchFile = (rootDirPath, regExp, deep = false) => {
  const init = (dirPath) => {
    const matchFile = [];
    const names = fs.readdirSync(dirPath);
    // 获取当前目录下的文件对象列表
    const fileList = names.filter((item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = fs.statSync(itemPath);
      return stats.isFile();
    });
    // 获取当前目录下的文件目录列表
    const dirList = names.filter((item) => {
      const itemPath = path.resolve(dirPath, item);
      const stats = fs.statSync(itemPath);
      return stats.isDirectory();
    });
    // 遍历fileList，根据正则与文件名进行匹配
    fileList.forEach((item) => {
      const itemPath = path.resolve(dirPath, item);
      const isMatch = regExp.test(item);
      if (isMatch) {
        matchFile.push({
          absolutePath: itemPath,
          fileBuffer: fs.readFileSync(itemPath),
          filename: item
        })
      }
    })
    // 深度匹配，即遍历子目录下的文件
    if (deep) {
      dirList.forEach((item) => {
        const itemPath = path.resolve(dirPath, item);
        matchFile.push(...init(itemPath));
      })
    }
    return matchFile;
  }
  return init(rootDirPath);
}
/** 将模板写入文件
 * @param writeDirPath   写入的目标目录路径
 * @param filename       写入的文件夹名称
 * @param templateString 写入模板
 */
const writeTemplToFile = (writeDirPath, filename, templateString) => {
  const filePath = path.resolve(writeDirPath, filename);
  fs.writeFileSync(filePath, templateString);
  console.log('文件创建成功:', filePath);
}
/** 文件名转换
 * @param filename     文件名称
 * @return {string}
 */
const transformFileName = (filename) => {
  switch (filename) {
    case 'index.ejs':
      return 'index.tsx'
    case 'style.ejs':
      return 'style.js'
    default:
      return filename;
  }
}
/** 判断当前文件/目录是否已存在
 * uncertainPath: 需要验证的文件/目录的路径
 * */
const verifyExist = (uncertainPath) => {
  const isExist = fs.existsSync(uncertainPath)

  if (isExist) {
    console.log('文件/目录已存在;' + uncertainPath);
    return true
  }
  return false;
  // try {
  //   fs.accessSync(uncertainPath, fs.constants.F_OK);
  //   console.log('文件/目录已存在;' + uncertainPath);
  //   return true
  // } catch (e) {
  //   return false;
  // }
}

module.exports = {
  isWindowEnv,
  getEjsTemplate,
  writeTemplToFile,
  verifyExist,
  transformFileName
}
