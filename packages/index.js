import path from 'path'
import mapDirectory from './directorymapper'
import { writeFile, wordMapping, getGlobalData } from './utils'
import { init as vueinit } from './vue'
import scriptinit from './script'
import { init as htmlinit, ast2string } from './html'
import htmlrules from './rules/html'
const { vueTagRule, vueTextRule, koTagRule, koTextRule } = htmlrules

var spinner = null
var _extractOnly = false
var translate = (config) => {
  if (typeof config !== 'object') {
    thorw.Error('Error:params config should be typeof "object"!')
    return;
  }
  var { sourcePath, outputPath, needTranslate, type, ignoreDirectory, resourceIdPrefix, extractOnly } = config
  getGlobalData.ignoreDirectory = ignoreDirectory || []
  if (resourceIdPrefix) {
    getGlobalData.resourceIdPrefix = resourceIdPrefix
  }
  _extractOnly = !!extractOnly
  function output (filepath, strFileData) {
    if (!_extractOnly) {
      filepath = filepath.replace(sourcePath, outputPath)
      writeFile(filepath, strFileData)
    }
    process.stdout.write("=")
  }
  function vueparser (path, input) {
    var result = vueinit(input)
    output(path, result)
  }
  function jsparser (path, input) {
    var result = scriptinit(input)
    output(path, result)
  }
  function htmlparser (path, input, type) {
    var result;
    switch (type) {
      case 'vue': result = htmlinit(input, { tagRule: vueTagRule, textRule: vueTextRule }); break;
      case 'ko': result = htmlinit(input, { tagRule: koTagRule, textRule: koTextRule })
    }
    output(path, ast2string(result))
  }
  return function (option) {
    process.stdout.write("[")
    extractOnly = option?.extractOnly
    if (!outputPath) {
      outputPath = sourcePath
    }
    if (!type) {
      type = "vue"
    }
    mapDirectory(sourcePath, function (path, extendsion, fileData) {
      switch (extendsion) {
        case 'vue': vueparser(path, fileData); break;
        case 'js': jsparser(path, fileData); break;
        case 'html': htmlparser(path, fileData, type); break;
        case 'java': break;
      }
    }, function () {
      process.stdout.write("]")
      process.stdout.write("done")
      option?.extractCallback && option.extractCallback(wordMapping)
      var propertiseTxt = ""
      Object.keys(wordMapping).forEach(key => {
        propertiseTxt += key + '=' + wordMapping[key] + '\n'
      })
      var strData = JSON.stringify(wordMapping)
      var jsTxt = "var words = " + strData + "\n"
      jsTxt += "module.exports = words"
      writeFile(outputPath + "/words.json", strData)
      writeFile(outputPath + "/words.js", jsTxt)
      writeFile(outputPath + "/words.properties", propertiseTxt)
    })
  }
}
export default {
  translate: translate
}