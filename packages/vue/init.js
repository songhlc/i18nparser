// 把.vue文件拆分成template、script和style
// tempate按照html来处理，script按照js来处理，style不处理
import { init as htmlinit, ast2string } from '../html'
import htmlrules from '../rules/html'
import scriptinit from '../rules/script'
import * as html from 'html5parser-fork'
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
  var templateAst = htmlinit(ast2string(templateNode), { tagRule: vueTagRule, textRule: vueTextRule })
  // ast => string
  var strTemplate = ast2string(templateAst)
  // script => string
  var strScript = scriptNode.length > 0 ? scriptinit(scriptNode[0].body[0].value) : ''
  return strTemplate + "\n" + "<script>" + strScript + "</script>" + "\n" + ast2string(styleNode)
}
export default init