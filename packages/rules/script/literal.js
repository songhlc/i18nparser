import { needtranslate, isVueBindAttr, TRANSLATE_METHOD, getResourceId } from '../../utils'
var rule = Literal => {
  if (needtranslate(Literal.value)) {

  }
}
export default rule