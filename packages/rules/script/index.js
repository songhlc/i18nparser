/**
 * 解析纯javascript代码
 * 
 * @param {*} node 
 */
import * as recast from "recast"
import chooseRule from './chooseRule'
import { needtranslate } from '../../utils'
var rule = (input) => {
  var ast = recast.parse(input)
  // see more details in https://github.com/benjamn/ast-types/blob/master/gen/visitor.ts
  recast.visit(ast, {
    // vue节点 有时候直接以export default开头
    visitExportDefaultDeclaration: function (path) {
      var { node } = path
      chooseRule(node.declaration, null, null)
      return false
    },
    // visitStatement
    visitStatement: function (path) {
      // BinaryExpression  'a'+'b'
      var { node } = path
      var output = recast.print(node).code
      if (needtranslate(output)) {
        // console.log('visitStatement:', output)
      }
      chooseRule(node)
      return false
    },
    // 便利属性定义 var b = 'test'
    visitIdentifier: function (path) {
      var { node } = path
      var output = recast.print(node).code
      if (needtranslate(output)) {
        console.log('visitIdentifier:', output)
      }
      return false
    },
    visitExpressionStatement: function (path) {
      var { node } = path
      // 判断参数里是否包含call和literal
      var output = recast.print(node).code
      if (needtranslate(output)) {
        // console.log('visitExpressionStatement:', output)
      }
      chooseRule(node.expression, null, null)
      // if (node.expression.type =)
      // node.expression.arguments && node.expression.arguments.forEach((arg, index) => {
      //   // 如果是字符型
      //   if (arg.type === "Literal") {
      //     if (needtranslate(arg.value)) {
      //       node.expression.arguments[index] = generateCallExpression('xxx-id')
      //     }
      //   }
      // })
      return false
    }
  })
  return recast.print(ast).code
}
export default rule