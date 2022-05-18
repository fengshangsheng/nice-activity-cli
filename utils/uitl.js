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
  const template = getTemplate(templateType);
  console.log('template', template);
}

const getTemplate = (type) => {
  const templateDir = path.resolve(absolutePath, './template');

  dirMatchFile(templateDir, /.tsx$/g, true);

  // const matchEjs = require.context('./template', true, /[\w-]+\.ejs$/);
  // matchEjs.keys().forEach((fileName, index) => {
  //   console.log('fileName', fileName);
  //   if (fileName.indexOf(fileName) === 0) {
  //     const componentConfig = matchEjs(fileName)
  //     return componentConfig.default;
  //   }
  // })
  // return false;
}

const dirMatchFile = (dirPath, regExp, deep = false) => {
  const matched = [];

  function init(dirPath, regExp, deep) {
    fs.readdir(dirPath, async (er, fileNames) => {
      if (er) throw new Error(er);

      const file = [];
      for (let i = 0; i < fileNames.length; i++) {
        const item = fileNames[i];
        const itemPath = path.resolve(dirPath, item);
        const stats = fs.lstatSync(itemPath);

        if (stats.isFile() && regExp.test(item)) {
          const zz = await fs.readFileSync(itemPath)
          console.log('zz', zz);
          file.push(zz);
        }
        if (deep && stats.isDirectory()) {
          file.push(...init(itemPath, regExp, deep));
        }
      }
      console.log('file', file);
      return file;
    })
  }

  return init(dirPath, regExp, deep);
}

module.exports = {
  isWindowEnv,
  compileTemplate
}
