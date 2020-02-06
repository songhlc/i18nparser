import { needtranslate, isVueBindAttr, TRANSLATE_METHOD, getResourceId } from '../../utils'
var rule = Literal => {
  if (needtranslate(Literal.value)) {
    Literal.value = "xxxasdfasdfjlkjsadf";
  }
}
export default rule