import { needtranslate, getResourceId, generateCallExpression, getGlobalData } from '../../utils'
var rule = (Literal, parentNode, attrKey) => {
  if (needtranslate(Literal.value)) {
    if (parentNode) {
      // 非正则表达式类型才处理
      if (!Literal.regex) {
        // cb.lang.template('中文ddd', {a: a}) => cb.lang.template('xxx-res-id', {a: a})
        if (parentNode._iscblang) {
          var text = getResourceId(Literal.value)
          parentNode[attrKey].value = text
          parentNode[attrKey].raw = text
        } else {
          var textMapping = getGlobalData.getTextMapping()
          // 如果textMapping中存在则直接使用
          var sst = getGlobalData.supportShortTempalte
          if (textMapping[Literal.value]) {
            parentNode[attrKey] = generateCallExpression(textMapping[Literal.value], Literal.value, getGlobalData.quote)
          } else if (sst && textMapping[Literal.value+':']){
            parentNode[attrKey] = generateCallExpression(textMapping[Literal.value+':'], Literal.value, getGlobalData.quote, 'shortTemplate')
          } else if (sst && textMapping[Literal.value+'：']) {
            parentNode[attrKey] = generateCallExpression(textMapping[Literal.value+'：'], Literal.value, getGlobalData.quote, 'shortTemplate')
          } else {
            parentNode[attrKey] = generateCallExpression(getResourceId(Literal.value), Literal.value, getGlobalData.quote)
          }
        }
      }
    }
  }
}
export default rule