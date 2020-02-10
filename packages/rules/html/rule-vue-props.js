/**
 * 比如 placeholder
 * 等这种纯html属性 以及自定义组件 不包含:以及v-bindv-bind
 * <group title="我的真实姓名：" class="form-group">
 * <group :title="cb.lang.template('resid'/*我的真实姓名：/*)" class="form-group">
 * @param {*} node 
 */
// <group :title="cb.template.lang('xxxid'/*123*/)" class="form-group"></group>
import { needtranslate, isVueBindAttr } from '../../utils'
import scriptrule from '../script'
const SINGLEQUOTE = "'"
const DOUBLEQUOTE = '"'
var rule = node => {
  if (node.attributes) {
    node.attributes.forEach(v => {
      if (isVueBindAttr(v.name?.value) && !v.value?._translated && needtranslate(v.value?.value)) {
        var convertString = scriptrule(v.value?.value, v.value.quote)
        v.value._translated = true
        v.value.value = convertString
      }
    })
  }
}
export default rule