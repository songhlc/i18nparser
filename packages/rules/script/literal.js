import { needtranslate, getResourceId, generateCallExpression, getGlobalData } from '../../utils'
var rule = (Literal, parentNode, attrKey) => {
  if (needtranslate(Literal.value)) {
    if (parentNode) {
      parentNode[attrKey] = generateCallExpression(getResourceId(Literal.value), Literal.value, getGlobalData.quote)
    }
  }
}
export default rule