/**
 * 比如 placeholder
 * 等这种纯html属性 以及自定义组件
 * 输入文本：中文
 * 
 * @param {*} node 
 */
// {{cb.template.lang('xxxid'/*中文*/)}}
import { getResourceId, TRANSLATE_METHOD } from '../../utils'
var rule = node => {
  if (node.type != "Tag" && !node._translated) {
    node._translated = true
    var originText = node.value.trim()
    var quote = '"'
    node.value = "{{" + TRANSLATE_METHOD + '(' + quote + getResourceId(originText) + quote + '/*' + originText + '*/)' + "}}"
  }
}
export default rule