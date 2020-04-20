import { needtranslate, getResourceId, generateCallExpression, getGlobalData } from '../../utils'
var rule = (Literal, parentNode, attrKey) => {
  if (needtranslate(Literal.value)) {
    debugger
    if (parentNode) {
      // 非正则表达式类型才处理
      if (!Literal.regex) {
        parentNode[attrKey] = generateCallExpression(getResourceId(Literal.value), Literal.value, getGlobalData.quote)
      }
    }
  }
}
export default rule