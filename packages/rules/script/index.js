/**
 * 解析纯javascript代码
 * 
 * @param {*} node 
 */
import * as recast from "recast"
import chooseRule from './chooseRule'
var rule = input => {
  var ast = recast.parse(input)
  debugger
  recast.visit(ast, {
    // visitStatement
    visitStatement: function (path) {
      // BinaryExpression  'a'+'b'
      var { node } = path
      var output = recast.print(node).code
      console.log('visitStatement:', output)
      debugger
      return false
    },
    // 便利属性定义 var b = 'test'
    visitIdentifier: function (path) {
      var { node } = path
      var output = recast.print(node).code
      console.log('visitIdentifier:', output)
      debugger
      return false
    },
    visitExpressionStatement: function (path) {
      var { node } = path
      // 判断参数里是否包含call和literal
      var output = recast.print(node).code
      console.log('visitExpressionStatement:', output);
      chooseRule(node.expression)
      
      // if (node.expression.type =)
      debugger
      node.expression.arguments && node.expression.arguments.forEach((arg, index) => {
        // 如果是字符型
        if (arg.type === "Literal") {
          if (needtranslate(arg.value)) {
            node.expression.arguments[index] = generateCallExpression('xxx-id')
          }
        }
      })
      return false
    }
  })
}
export default rule