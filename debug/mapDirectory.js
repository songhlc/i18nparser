import mapDirectory from '../packages/directorymapper'
import { writeFile } from '../packages/utils'
import { init as vueinit } from '../packages/vue'
import scriptinit from '../packages/script'
import { init as htmlinit, ast2string } from '../packages/html'
import htmlrules from '../packages/rules/html'
const { vueTagRule, vueTextRule } = htmlrules
mapDirectory("./code", function (path, extendsion, fileData) {
  switch (extendsion) {
    case 'vue': vueparser(path, fileData); break;
    case 'js': jsparser(path, fileData); break;
    case 'html': htmlparser(path, fileData); break;
  }
})
function output (path, strFileData) {
  path = path.replace('code/', 'coderesult/')
  debugger
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