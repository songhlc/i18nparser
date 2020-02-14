
import path from 'path'
import mapDirectory from './directorymapper'
import { writeFile, wordMapping } from './utils'
import { init as vueinit } from './vue'
import scriptinit from './script'
import { init as htmlinit, ast2string } from './html'
import htmlrules from './rules/html'
const { vueTagRule, vueTextRule } = htmlrules

var translate = (configPath) => {
  var config = require(configPath || path.join(__dirname, "./i18nparser.config.js"))
  var { sourcePath, outputPath, needTranslate, type } = config
  var extractOnly = false
  function output (filepath, strFileData) {
    if (!extractOnly) {
      filepath = filepath.replace(sourcePath, outputPath)
      writeFile(filepath, strFileData)
    }
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
    }
    output(path, ast2string(result))
  }
  return function (option) {
    extractOnly = option?.extractOnly
    if (!outputPath) {
      outputPath = sourcePath
    }
    if (!type) {
      type = "vue"
    }
    mapDirectory(sourcePath, function (path, extendsion, fileData) {
      try {
        switch (extendsion) {
          case 'vue': vueparser(path, fileData); break;
          case 'js': jsparser(path, fileData); break;
          case 'html': htmlparser(path, fileData, type); break;
          case 'java': break;
        }
      } catch (e) {
        console.error(e)
      }
    }, function () {
      option.extractCallback && option.extractCallback(wordMapping)
      writeFile(outputPath + "/words.json", JSON.stringify(wordMapping))
    })
  }
}
export default {
  translate: translate
}