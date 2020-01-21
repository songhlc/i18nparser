import * as recast from "recast"
const {
  identifier: id,
  callExpression,
  literal,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression
} = recast.types.builders
import needtranslate from '../packages/utils/needtraslate'
var input = `
root.$Message.success(cb.lang.template("needtranslate"),'当前单据没有走审批流')
var a = {
  data () {
    return {
      name: 1,
      buyofferType: [
        {
          value: '1',
          label: '框架协议'
        },
        {
          value: '2',
          label: '普通合同'
        },
        {
          value: '3',
          label: '直接下单'
        },
        {
          value: '4',
          label: '价格调整'
        }
      ]
    }
  }
}
h('div', '询价发布时间')
h('div', params.row.archiveStatus == '1' ? '已归档' : '未归档')
`
/** 需要处理的 
 *   `root.$Message.success('当前单据没有走审批流')`  ExpressionStatement 
 * 
 * 
 * */
// 
function generateCallExpression (resid) {
  var expression = `cb.lang.template("${ resid }")`
  var ast = recast.parse(expression)
  var d = expressionStatement(
    callExpression(
      memberExpression(
        memberExpression(id('cb'), id('lang')),
        id('template')
      ),
      [literal(resid)]
    )
  )
  debugger
  return d || ast.program.body[0]
}
var jsast = recast.parse(input)
// see more details in https://github.com/benjamn/ast-types/blob/master/gen/visitor.ts
recast.visit(jsast, {
  // visitStatement
  // visitExpression
  visitExpressionStatement: function (path) {
    var { node } = path
    // 判断参数里是否包含call和literal
    node.expression.arguments.forEach((arg, index) => {
      debugger
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
console.log(output)