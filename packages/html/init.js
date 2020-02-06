import ast2string from './ast2string'
import * as html from 'html5parser'
import * as recast from "recast"
import { needtraslate } from '../utils'
import { scriptrules, tagrules, textrules } from './rules'
var isInScript = false
/**
 * 
 * @param {*} input 
 * @param {
 *  tagEnter: Function, 
 *  scriptEnter: Function,
 *  textEnter: Function,
 *  leave: Function
 * } option 
 */
function init (input, options = {}) {
  const ast = html.parse(input);
  const { tagRule, scriptRule, textRule, leave } = options
  html.walk(ast, {
    enter: (node) => {
      if (node.type === html.SyntaxKind.Tag) {
        if (node.name == "script") {
          isInScript = true
        }
        // node.open.value是tag的string值
        if (needtraslate(node?.open?.value)) {
          // 默认规则
          tagrules.forEach(rule => {
            rule(node)
          })
          // 自定义规则
          tagRule && tagRule.forEach(rule => {
            rule(node)
          })
        }
      } else {
        // html中解析内部js
        if (isInScript) {
          const jsast = recast.parse(node.value);
          // 默认规则
          scriptrules.forEach(rule => {
            rule(jsast)
          })
          // 自定义规则
          scriptRule && scriptRule.forEach(rule => {
            rule(jsast)
          })
          // js转换后重新解析
          const output = recast.print(jsast).code;
          node.value = output
        }
        if (needtraslate(node?.value)) {
          textrules.forEach(rule => {
            rule(node)
          })
          // 自定义规则
          textRule && textRule.forEach(rule => {
            rule(node)
          })
        }
      }
    },
    leave: (node) => {
      if (isInScript) {
        isInScript = false
      }
    }
  });
  return ast
}
export default init