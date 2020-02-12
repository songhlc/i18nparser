/**
 * Text里需要用js解析的 模版
 * 如：{{a||'中文'}}
 */
// {{a||cb.template.lang('xxxid'/*中文*/)}}
import { getResourceId, TRANSLATE_METHOD, isDynamicText, needtranslate } from '../../utils'
import scriptrule from '../script'
var rule = node => {
  if (isDynamicText(node.value)) {
    node._translated = true
    var originText = node.value.trim()
    // 有可能是 aa {{a}}aa{{a}}的形式，所要要把text和{{}}包含的内容拆开来解析
    // 现根据 {{ 拆分成字符串，然后不包含}}的则为要用js解析的字符串，没有}}的 认为直接按字符串来处理
    // TODO:  继续完善
    var LEFT = "{{"
    var RIGHT = "}}"
    var matchFlag = null
    var splitResult = originText.split(LEFT)
    var rawTexts = []
    var dynamicTexts = []
    splitResult.forEach((r, index) => {
      if (r) {
        if (r.indexOf(RIGHT) >= 0) {
          r.split(RIGHT).forEach((t, innerindex) => {
            if (innerindex === 0) {
              dynamicTexts.push({
                index: index - 0.1,
                text: t
              })
            } else {
              rawTexts.push({
                index: index,
                text: t
              })
            }
          })

        } else {
          rawTexts.push({
            index: index,
            text: r
          })
        }
      }
    })
    var quote = '"'
    rawTexts = rawTexts.map(text => {
      var translate = text.text
      if (needtranslate(translate)) {
        translate = "{{" + TRANSLATE_METHOD + '(' + quote + getResourceId(text.text) + quote + '/*' + text.text + '*/)' + "}}"
      }
      return {
        index: text.index,
        text: translate
      }
    })
    dynamicTexts = dynamicTexts.map(text => {
      var translate = text.text
      if (needtranslate(translate)) {
        translate = scriptrule(translate)
      }
      translate = "{{" + translate + "}}"
      return {
        index: text.index,
        text: translate
      }
    })
    var translatedText = [].concat(rawTexts).concat(dynamicTexts)
      .sort(function (a, b) { return a.index - b.index }) // 按index排序
      .map(function (i) { return i.text }) // 只保留翻译后的text
      .reduce(function (a, b) { return a + b }) // 拼接所有text
    node.value = translatedText
  }
}
export default rule