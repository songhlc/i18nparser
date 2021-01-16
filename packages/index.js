import path from 'path'
import mapDirectory from './directorymapper'
import {
  writeFile,
  wordMapping,
  getGlobalData,
  needtranslate as defaultNeedTranslate,
} from './utils'
import { init as vueinit } from './vue'
import scriptinit from './script'
import { init as htmlinit, ast2string } from './html'
import htmlrules from './rules/html'
import {setTextMapping} from './utils/wordMapping'
const { vueTagRule, vueTextRule, koTagRule, koTextRule } = htmlrules

var spinner = null
var _extractOnly = false
var translate = (config) => {
  if (typeof config !== 'object') {
    thorw.Error('Error:params config should be typeof "object"!')
    return
  }
  var {
    sourcePath,
    outputPath,
    needTranslate,
    type,
    ignoreDirectory,
    resourceIdPrefix,
    extractOnly,
    ignoreComment,
    useWindow,
    originData
  } = config
  getGlobalData.originData = originData || {}
  getGlobalData.ignoreDirectory = ignoreDirectory || []
  getGlobalData.ignoreComment = ignoreComment || false
  getGlobalData.useWindow = useWindow || false
  if (!needTranslate) {
    needTranslate = defaultNeedTranslate
  }
  if (resourceIdPrefix) {
    getGlobalData.resourceIdPrefix = resourceIdPrefix
  }
  _extractOnly = !!extractOnly
  function output(filepath, strFileData) {
    if (!_extractOnly) {
      filepath = filepath.replace(sourcePath, outputPath)
      writeFile(filepath, strFileData)
    }
    process.stdout.write('=')
  }
  function vueparser(path, input) {
    if (needTranslate(input)) {
      var result = vueinit(input)
      output(path, result)
    }
  }
  function jsparser(path, input) {
    if (needTranslate(input)) {
      try {
        var result = scriptinit(input)
        output(path, result)
      } catch (e) {
        console.error('文件' + path + ': js解析出错')
      }
    }
  }
  function htmlparser(path, input, type) {
    if (needTranslate(input)) {
      var result
      switch (type) {
        case 'vue':
          result = htmlinit(input, {
            tagRule: vueTagRule,
            textRule: vueTextRule,
          })
          break
        case 'ko':
          result = htmlinit(input, { tagRule: koTagRule, textRule: koTextRule })
      }
      output(path, ast2string(result))
    }
  }
  return function (option) {
    process.stdout.write('[')
    extractOnly = option?.extractOnly
    var extractEnd = option.extractEnd
    if (!outputPath) {
      outputPath = sourcePath
    }
    if (!type) {
      type = 'vue'
    }
    try {
      mapDirectory(
        sourcePath,
        function (path, extendsion, fileData) {
          console.log('start:' + path)
          switch (extendsion) {
            case 'vue':
              vueparser(path, fileData)
              break
            case 'js':
              jsparser(path, fileData)
              break
            case 'html':
              htmlparser(path, fileData, type)
              break
            case 'ejs':
              htmlparser(path, fileData, type)
              break
            case 'java':
              break
          }
        },
        function () {
          process.stdout.write(']')
          process.stdout.write('done')
          option?.extractCallback && option.extractCallback(wordMapping)
          var propertiseTxt = ''
          Object.keys(wordMapping).forEach((key) => {
            propertiseTxt += key + '=' + wordMapping[key] + '\n'
          })
          var strData = JSON.stringify(wordMapping)
          var jsTxt = 'var words = ' + strData
          if (extractEnd) {
            extractEnd(wordMapping)
          }
          writeFile(outputPath + '/words.json', strData)
          writeFile(outputPath + '/words.js', jsTxt)
          writeFile(outputPath + '/words.properties', propertiseTxt)
        }
      )
    } catch (e) {
      debugger
    }
  }
}
export default {
  translate: translate,
}
