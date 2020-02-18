import mapDirectory from '../packages/directorymapper'
import { writeFile, wordMapping, getGlobalData } from '../packages/utils'
import { init as vueinit } from '../packages/vue'
import scriptinit from '../packages/script'
import { init as htmlinit, ast2string } from '../packages/html'
import htmlrules from '../packages/rules/html'
const { vueTagRule, vueTextRule } = htmlrules
const rootDir = "/Users/windknow/git/cpu-relief/" // "" //
const sourceDir = "code" // "code" //rootDir + "src" //
const destDir = "coderesult" // "coderesult" //rootDir + "src" // 
const wordDir = "coderesult" // rootDir // 
getGlobalData.ignoreDirectory = ["/ignoredir", "/js/nodata/testme"]
mapDirectory(sourceDir, function (path, extendsion, fileData) {
  try {
    switch (extendsion) {
      case 'vue': vueparser(path, fileData); break;
      case 'js': jsparser(path, fileData); break;
      case 'html': htmlparser(path, fileData); break;
    }
  } catch (e) {
    console.error(e)
  }
}, function () {
  writeFile(wordDir + "/words.json", JSON.stringify(wordMapping))
})
function output (path, strFileData) {
  path = path.replace(sourceDir, destDir)
  writeFile(path, strFileData)
}
function vueparser (path, input) {
  var result = vueinit(input)
  output(path, result)
}
function jsparser (path, input) {
  var result = scriptinit(input)
  output(path, result)
}
function htmlparser (path, input) {
  var result = htmlinit(input, { tagRule: vueTagRule, textRule: vueTextRule })
  output(path, ast2string(result))
}