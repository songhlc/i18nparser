import * as recast from "recast"
const {
  identifier: id,
  callExpression,
  literal,
  memberExpression,

} = recast.types.builders
// 传入资源id 生成：cb.lang.template("${ resid }")格式的语法
export default function generateCallExpression (resid) {
  // var expression = `cb.lang.template("${ resid }")`
  // var ast = recast.parse(expression)
  // expressionStatement 会在末尾添加分号“；”，改成直接用callExpression
  debugger
  var d = callExpression(
    memberExpression(
      memberExpression(id('cb'), id('lang')),
      id('template')
    ),
    [literal(resid)]
  )
  return d
}