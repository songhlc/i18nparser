/**
 * Text里需要用js解析的 模版
 * 如：{{a||'中文'}}
 */
// {{a||cb.template.lang('xxxid'/*中文*/)}}
import { getResourceId, TRANSLATE_METHOD, isDynamicText } from '../../utils'
var rule = node => {
  if (isDynamicText(node.value)) {
    node._translated = true
    var originText = node.value.trim()
    // 有可能是 aa {{a}}aa{{a}}的形式，所要要把text和{{}}包含的内容拆开来解析
    // TODO:  继续完善
  }
}
export default rule