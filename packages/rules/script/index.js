/**
 * 解析纯javascript代码
 * 
 * @param {*} node 
 */
import * as recast from "recast"
var rule = input => {
  var ast = recast.parse(expression)
  ast.visit({
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