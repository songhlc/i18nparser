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
import { needtranslate, generateCallExpression } from '../packages/utils'
// var input = `
//   a(cb.t('xxx-id'))
//   a("这是个什么问题")
// `
var input = `
root.$Message.success(cb.lang.template("needtranslate"),'当前单据没有走审批流');
var b = '现金';
var b = '现金：'+ 10000;
var a;
a = {
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
input = `
cb('test');
cb("test2")
`
/** 需要处理的 
 *   `root.$Message.success('当前单据没有走审批流')`  ExpressionStatement 
 * 
 * 
 * */
// 
var jsast = recast.parse(input)
// see more details in https://github.com/benjamn/ast-types/blob/master/gen/visitor.ts
recast.visit(jsast, {
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
});
debugger
const output = recast.print(jsast).code
var input2 = `
{"callee":{"object":{"object":{"name":"cb","loc":null,"type":"Identifier","comments":null,"optional":false,"typeAnnotation":null},"property":{"name":"lang","loc":null,"type":"Identifier","comments":null,"optional":false,"typeAnnotation":null},"computed":false,"loc":null,"type":"MemberExpression","comments":null},"property":{"name":"template","loc":null,"type":"Identifier","comments":null,"optional":false,"typeAnnotation":null},"computed":false,"loc":null,"type":"MemberExpression","comments":null},"arguments":[{"value":"redId0.2482171841320504","loc":null,"type":"Literal","comments":[{"value":"请填写物资名称及数量，详细的规格型号或其他补充说明（最多可输入400字）","leading":false,"trailing":true,"loc":null,"type":"CommentBlock"}],"regex":null,"raw":"'redId0.2482171841320504'"}],"loc":null,"type":"CallExpression","comments":null,"typeArguments":null}
`
var output2 = recast.print(input2).code
console.log(output2)