
export default function needtranslate (text, locale) {
  if (!locale) {
    locale = 'zh_cn'
  }
  locale = locale.toLowerCase().replace('-', '').replace('_', '')
  // ko中i18n指令也要使用
  if (text?.indexOf && text.indexOf('i18n:') >= 0) {
    return true
  }
  var testText = typeof (str) == 'string' ? text.trim() : text
  switch (locale) {
    case 'zhcn': return /(.||\n)*[\u4e00-\u9fa5]+(.||\n)*$/.test(testText); break;
    case 'enus': return /a-zA-Z*/.test(text); break;
  }
}