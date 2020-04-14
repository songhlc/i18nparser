import {
  needtranslate,
  getResourceId,
  generateCallExpression,
  getGlobalData
} from '../../utils'
import { print } from 'recast'
var rule = (Literal, parentNode, attrKey) => {
  if (needtranslate(Literal.value.raw)) {
    if (parentNode) {
      // 非正则表达式类型才处理
      if (!Literal.regex) {
        var text = generateCallExpression(
          getResourceId(Literal.value.raw),
          Literal.value.raw,
          getGlobalData.quote
        )
        var code = print(text).code
        Literal.value.raw = '${' + code + '}'
      }
    }
  }
}
export default rule
