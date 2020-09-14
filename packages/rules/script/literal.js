import { needtranslate, getResourceId, generateCallExpression, getGlobalData } from '../../utils'
var rule = (Literal, parentNode, attrKey) => {
  if (needtranslate(Literal.value)) {
    if (parentNode) {
      // 非正则表达式类型才处理
      if (!Literal.regex) {
        if (parentNode._iscblang) {
          var text = getResourceId(Literal.value)
          parentNode[attrKey].value = text
          parentNode[attrKey].raw = text
        } else {
          parentNode[attrKey] = generateCallExpression(getResourceId(Literal.value), Literal.value, getGlobalData.quote)
        }
      }
    }
  }
}
export default rule