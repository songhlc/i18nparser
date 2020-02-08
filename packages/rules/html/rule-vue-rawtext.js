/**
 * 比如 placeholder
 * 等这种纯html属性 以及自定义组件
 * 输入文本：中文
 * 注意 Text可能是 {{'a'|| b}} 这种要用js来处理要区分开来
 * @param {*} node 
 */
// {{cb.template.lang('xxxid'/*中文*/)}}
import { getResourceId, TRANSLATE_METHOD } from '../../utils'
var rule = node => {
  if (node.type == "Text" && !node._translated) {
    node._translated = true
    var originText = node.value.trim()
    var quote = '"'
    node.value = "{{" + TRANSLATE_METHOD + '(' + quote + getResourceId(originText) + quote + '/*' + originText + '*/)' + "}}"
  }
}
export default rule