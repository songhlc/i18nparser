import { needtranslate, getResourceId, generateCallExpression } from '../../utils'
var rule = (Literal, parentNode, attrKey) => {
  if (needtranslate(Literal.value)) {
    if (parentNode && attrKey)
      parentNode[attrKey] = generateCallExpression(getResourceId(Literal.value), Literal.value)
  }
}
export default rule