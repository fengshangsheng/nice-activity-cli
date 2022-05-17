// 是否为window环境
const isWinEnv = () => {
  return process.platform === 'win32'
}

module.exports = {
  isWinEnv
}
