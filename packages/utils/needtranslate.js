
export default function needtranslate (text, locale) {
  if (!locale) {
    locale = 'zh_cn'
  }
  locale = locale.toLowerCase().replace('-', '').replace('_', '')
  var testText = typeof (str) == 'string' ? text.trim() : text
  switch (locale) {
    case 'zhcn': return /(.||\n)*[\u4e00-\u9fa5]+(.||\n)*$/.test(testText); break;
    case 'enus': return /a-zA-Z*/.test(text); break;
  }
}