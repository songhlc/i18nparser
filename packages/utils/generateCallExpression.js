import * as recast from 'recast'
import getGlobalData from './getGlobalData'
const {
  identifier: id,
  callExpression,
  literal,
  memberExpression,
  commentBlock,
} = recast.types.builders
// 传入资源id 生成：cb.lang.template("${ resid }")格式的语法
export default function generateCallExpression(resid, originText, quote, fnName = 'template') {
  originText = originText.replace(/\(|\)/g, '')
  // 文本添加注释
  var comment = commentBlock(originText, false, true)
  var text = literal.from({
    value: resid,
    comments: [comment],
  })
  if (getGlobalData.ignoreComment) {
    text.comments = []
  }
  // 生成cb.lang.template('text'/* text */)的形式

  var expression = null
  if (!getGlobalData.useWindow) {
    expression = callExpression(
      memberExpression(memberExpression(id('cb'), id('lang')), id(fnName)),
      [text]
    )
  } else {
    // window.cb.lang.template
    expression = callExpression(
      memberExpression(
        memberExpression(memberExpression(id('window'), id('cb')), id('lang')),
        id(fnName)
      ),
      [text]
    )
  }

  if (quote && quote !== "'") {
    var code = recast.print(expression).code
    code = code.replace(/"/g, "'")
    return recast.parse(code)
  } else {
    return expression
  }
}
