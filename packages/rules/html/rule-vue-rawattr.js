/**
 * 比如 placeholder
 * 等这种纯html属性 以及自定义组件 不包含:以及v-bindv-bind
 * <group title="我的真实姓名：" class="form-group">
 * 
 * @param {*} node 
 */
// <group :title="cb.template.lang('xxxid'/*123*/)" class="form-group"></group>
import { needtranslate, isVueBindAttr, TRANSLATE_METHOD, getResourceId } from '../../utils'
var rule = node => {
  if (node.attributes) {
    node.attributes.forEach(v => {
      if (!isVueBindAttr(v.name?.value) && needtranslate(v.value?.value) && !v.value?._translated) {
        v.name.value = ':' + v.name.value
        var quote = v.value.quote == '"' ? "'" : '"'
        v.value.value = TRANSLATE_METHOD + '(' + quote + getResourceId(v.value?.value) + quote + '/*' + v.value?.value + '*/)'
        v.value._translated = true
      }
    })
  }
}
export default rule