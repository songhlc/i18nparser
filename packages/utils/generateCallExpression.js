import * as recast from "recast"
const {
  identifier: id,
  callExpression,
  literal,
  memberExpression,
  commentBlock
} = recast.types.builders
// 传入资源id 生成：cb.lang.template("${ resid }")格式的语法
export default function generateCallExpression (resid, originText, quote) {
  // 文本添加注释
  var comment = commentBlock(originText, false, true)
  var text = literal.from({
    value: resid,
    comments: [comment]
  })
  // 生成cb.lang.template('text'/* text */)的形式
  var expression = callExpression(
    memberExpression(
      memberExpression(id('cb'), id('lang')),
      id('template')
    ),
    [text]
  )
  if (quote && quote !== "'") {
    var code = recast.print(expression).code
    code = code.replace(/"/g, "'")
    return recast.parse(code)
  } else {
    return expression
  }
}