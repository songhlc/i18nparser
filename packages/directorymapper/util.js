import path from 'path'
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
// 获取文件扩展名
function getExtendsion (filepath) {
  var index = filepath.lastIndexOf(".");
  var suffix = filepath.substr(index + 1);
  return suffix
}
// 给当前文件或文件夹添加完整的路径
function fullPath (dir, files) {
  return files.map(function (f) {
    return path.join(dir, f)
  })
}
function isFileExtensionInList (filepath, list) {
  var flag = false
  if (!list.length) {
    return false
  }
  for (var i = 0; i < list.length; i++) {
    if (filepath.indexOf(list[i]) > -1) {
      flag = true
      break
    }
  }
  return flag
}
export {
  isDirectoryIgnore,
  getExtendsion,
  fullPath,
  isFileExtensionInList
}