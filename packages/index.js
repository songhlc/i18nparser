import path from 'path'
import mapDirectory from './directorymapper'
import { writeFile, wordMapping, getGlobalData } from './utils'
import { init as vueinit } from './vue'
import scriptinit from './script'
import { init as htmlinit, ast2string } from './html'
import htmlrules from './rules/html'
const { vueTagRule, vueTextRule, koTagRule, koTextRule } = htmlrules

var spinner = null
var translate = (config) => {
  if (typeof config !== 'object') {
    thorw.Error('Error:params config should be typeof "object"!')
    return;
  }
  var { sourcePath, outputPath, needTranslate, type, ignoreDirectory, resourceIdPrefix } = config
  getGlobalData.ignoreDirectory = ignoreDirectory || []
  if (resourceIdPrefix) {
    getGlobalData.resourceIdPrefix = resourceIdPrefix
  }
  var extractOnly = false
  function output (filepath, strFileData) {

    if (!extractOnly) {
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
      writeFile(outputPath + "/words.json", JSON.stringify(wordMapping))
    })
  }
}
export default {
  translate: translate
}