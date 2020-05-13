import * as recast from "recast"
const {
  identifier: id,
  callExpression,
  literal,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression,
  commentBlock
} = recast.types.builders
import { needtranslate, generateCallExpression } from '../packages/utils'
// var input = `
//   a(cb.t('xxx-id'))
//   a("这是个什么问题")
// `
var input = "var a = `<p><span>` + '账期: '+ `</span>${ taxMoney || '0' }</p>`"
/** 需要处理的 
 *   `root.$Message.success('当前单据没有走审批流')`  ExpressionStatement 
 * 
 * 
 * */
// 
var jsast = recast.parse(input)
var originText = "textme2"
var text = literal('testme')
var quote = "'"
var comment = commentBlock(originText, false, true)
text.comments = [comment]
// 生成cb.lang.template('text'/* text */)的形式
var expression = callExpression(
  memberExpression(
    memberExpression(id('cb'), id('lang')),
    id('template')
  ),
  [text]
)
debugger
recast.print(jsast).code
// see more details in https://github.com/benjamn/ast-types/blob/master/gen/visitor.ts
recast.visit(jsast, {
  visitExportDefaultDeclaration: function (path) {
    var { node } = path
    debugger
    return false
  },
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
});
debugger
const output = recast.print(jsast).code
var input2 = `
{"callee":{"object":{"object":{"name":"cb","loc":null,"type":"Identifier","comments":null,"optional":false,"typeAnnotation":null},"property":{"name":"lang","loc":null,"type":"Identifier","comments":null,"optional":false,"typeAnnotation":null},"computed":false,"loc":null,"type":"MemberExpression","comments":null},"property":{"name":"template","loc":null,"type":"Identifier","comments":null,"optional":false,"typeAnnotation":null},"computed":false,"loc":null,"type":"MemberExpression","comments":null},"arguments":[{"value":"redId0.2482171841320504","loc":null,"type":"Literal","comments":[{"value":"请填写物资名称及数量，详细的规格型号或其他补充说明（最多可输入400字）","leading":false,"trailing":true,"loc":null,"type":"CommentBlock"}],"regex":null,"raw":"'redId0.2482171841320504'"}],"loc":null,"type":"CallExpression","comments":null,"typeArguments":null}
`
var output2 = recast.print(input2).code
console.log(output2)