// 遍历目录，识别符合规则的文件
import fs from 'fs'
import path from 'path'
import { isDirectoryIgnore, getExtendsion, fullPath, isFileExtensionInList } from './util'
function readFileStr (file, callback) {
  // 这里读取当前文件全部内容，用来判断该文件的内容是否为空，如果为空的话lineReader.eachLine不会执行
  var str = fs.readFileSync(file).toString()
  return callback(file, str)
}
var fileextensions = ['.js', '.vue', '.html', '.ejs']
var callbackmapping = null
var fileLength = 0
var readedFileLength = 0
function mapDir (dir, callback, finish) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((filename, index) => {
      let pathname = path.join(dir, filename)
      fileLength++
      fs.stat(pathname, (err, stats) => { // 读取文件信息
        if (err) {
          console.log('获取文件stats失败')
          return
        }
        if (stats.isDirectory()) {
          readedFileLength++
          mapDir(pathname, callback, finish)
        } else if (stats.isFile()) {
          if (!fileextensions.includes(path.extname(pathname))) {  // 仅处理特定文件
            readedFileLength++
            return
          }
          if (isDirectoryIgnore(pathname)) {
            // console.log("ignore:" + pathname)
            readedFileLength++
            return
          }
          // fileLength++
          readFileStr(pathname, function (filepath, fileData) {
            callback && callback(filepath, getExtendsion(filepath), fileData)
            console.log(filepath)
            readedFileLength++
          })
        }
      })
      if (index === files.length - 1) {
        finish && finish()
      }
    })
  })
}
function outterMap (dir, cbmapping, finish) {
  if (cbmapping) {
    callbackmapping = cbmapping
  }
  var dirfinish = function () {
    if (fileLength && fileLength == readedFileLength) {
      var oldLength = fileLength
      setTimeout(function () {
        if (oldLength == fileLength) {
          clearInterval(timer)
          finish()
        }
      }, 500)
    }
  }
  var timer = setInterval(dirfinish, 500)
  mapDir(dir, cbmapping, dirfinish)
}
export default outterMap