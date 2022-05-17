/**
 * 执行终端命令
 * */
const {spawn} = require('child_process');

const commandSpawn = (...args) => {
  console.log('args', args);
  return new Promise(resolve => {
    const _process = spawn(...args);
    // 当前指令执行完毕后关闭进程监听
    _process.on('close', () => {
      resolve();
    });
  })
}

module.exports = {
  commandSpawn
}
