// 把.vue文件拆分成template、script和style
// tempate按照html来处理，script按照js来处理，style不处理
import { init as htmlinit, ast2string } from '../html'
import htmlrules from '../rules/html'
import scriptinit from '../rules/script'
import * as html from 'html5parser'
const { vueTagRule, vueTextRule } = htmlrules
var init = function (input) {
  const ast = html.parse(input);
  var isInScript = false
  var templateNode = null
  var scriptNode = null
  var styleNode = null
  templateNode = ast.filter(node => {
    return node.name == "template"
  })
  scriptNode = ast.filter(node => {
    return node.name == "script"
  })
  styleNode = ast.filter(node => {
    return node.name == "style"
  })
  // var htmlAst = htmlinit(ast2string(templateNode), { tagRule: vueTagRule, textRule: vueTextRule })
  var scriptAst = scriptinit(scriptNode[0].body[0].value)
  // console.log(ast2string(htmlAst))
  console.log(scriptAst)
  // console.log(ast2string(styleNode))
}
export default init