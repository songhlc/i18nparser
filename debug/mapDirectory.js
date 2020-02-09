import mapDirectory from '../packages/directorymapper'
import { init as vueinit } from '../packages/vue'
import scriptinit from '../packages/script'
import { init as htmlinit, ast2string } from '../packages/html'
import htmlrules from '../packages/rules/html'
const { vueTagRule, vueTextRule } = htmlrules
mapDirectory("./code", function (path, extendsion, fileData) {
  console.log(path, extendsion)
  switch (extendsion) {
    case 'vue': vueparser(path, fileData); break;
    case 'js': jsparser(path, fileData); break;
    case 'html': htmlparser(path, fileData); break;
  }
})
function output (path, input) {
  console.log(input + "\n")
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