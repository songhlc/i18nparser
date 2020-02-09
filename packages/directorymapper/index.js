// 遍历目录，识别符合规则的文件
import fs from 'fs'
import { isDirectoryIgnore, getExtendsion, fullPath, isFileExtensionInList } from './util'
function readFileStr (file, callback) {
  // 这里读取当前文件全部内容，用来判断该文件的内容是否为空，如果为空的话lineReader.eachLine不会执行
  var str = fs.readFileSync(file).toString()
  return callback(file, str)
}

var fileextensions = ['.js', '.vue', '.html']
// 当前目录下js和html文件的总数
var filesize = 0
// 当前目录下已经完成读取的js和html文件的总数
var finishedSize = 0
// 当前目录下文件夹的数量
var directorySize = 0
// 当前目录下已经遍历的文件夹数量
var getDirectorySize = 0
// 当前目录下非js和html文件的总数
var otherFileSize = 0
// 当前目录下已经遍历的非js和html文件的数量
var getOtherFileSize = 0
// 存储所给目录下的所有文件夹
var directoryArr = []
var callbackmapping = null
function mapDirectory (path, cbmapping) {
  if (cbmapping) {
    callbackmapping = cbmapping
  }
  fs.readdir(path, function (err, files) {
    if (err) console.log(err)
    files = fullPath(path, files)
    if (files && files.length > 0) {
      // 循环获取当前目录下js和html文件、非这两种文件以及文件夹的数量
      for (var i = 0; i < files.length; i++) {
        var stats = fs.statSync(files[i])
        if (stats.isFile()) {
          if (isFileExtensionInList(files[i], fileextensions)) {
            filesize++
          } else {
            otherFileSize++
          }
        }
        if (stats.isDirectory()) {
          if (!isDirectoryIgnore(files[i])) {
            directorySize++
          }
        }
      }
      files.forEach(function (f) {
        fs.stat(f, function (err, stats) {
          if (stats.isFile()) {
            if (isFileExtensionInList(f, fileextensions)) {
              readFileStr(f, function (path, fileData) {
                // 回调处理
                callbackmapping(path, getExtendsion(path), fileData)
                finishedSize++
                if (filesize == finishedSize) {
                  filesize = 0
                  finishedSize = 0
                  getOtherFileSize = 0
                  otherFileSize = 0
                  directorySize = 0
                  getDirectorySize = 0
                  var directory = directoryArr.shift()
                  if (directory) {
                    if (!isDirectoryIgnore(directory)) {
                      mapDirectory(directory)
                    }
                  } else {
                    // 结束了
                    debugger
                  }
                }
              })
            } else {
              readFileStr(f, function (path, fileData) {
                debugger
              })
              // 这里处理当前目录下即没有html、js文件也没有文件夹的情况
              if (filesize == 0 && directorySize == 0) {
                getOtherFileSize++
                if (getOtherFileSize == otherFileSize) {
                  getOtherFileSize = 0
                  otherFileSize = 0
                  var directory = directoryArr.shift()
                  if (directory) {
                    if (!isDirectoryIgnore(directory)) {
                      mapDirectory(directory)
                    }
                  } else {
                    // writeTxt('../dest/final.txt', JSON.stringify(destDictionary));
                    // endCallback
                    debugger
                  }
                }

              }
            }
          }
          if (stats.isDirectory()) {
            if (!isDirectoryIgnore(f)) {
              directoryArr.push(f)
              // 这里处理当前目录下没有js和html文件的情况
              if (filesize == 0) {
                getDirectorySize++
                if (getDirectorySize == directorySize) {
                  getDirectorySize = 0
                  otherFileSize = 0
                  getOtherFileSize = 0
                  directorySize = 0
                  var directory = directoryArr.shift()
                  if (directory) {
                    if (!isDirectoryIgnore(directory)) {
                      mapDirectory(directory)
                    }
                  }
                }
              }
            }
          }
        })
      })
    }
  })
}
export default mapDirectory