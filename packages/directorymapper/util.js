// 用来判断是否当前目录要被忽略掉
function isDirectoryIgnore (directory) {
  // 如果目录在需要忽略的目录中，则不继续翻译此目录下的内容
  var ignoreDirectory = [] // 暂时不忽略任何目录
  var flag = false
  for (var i = 0; i < ignoreDirectory.length; i++) {
    if (directory.indexOf(ignoreDirectory[i]) > -1) {
      flag = true
      break
    }
  }
  return flag
}