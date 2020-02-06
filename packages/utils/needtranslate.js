
export default function needtranslate (text, locale) {
  if (!locale) {
    locale = 'zh_cn'
  }
  locale = locale.toLowerCase().replace('-', '').replace('_', '')
  switch (locale) {
    case 'zhcn': return /.*[\u4e00-\u9fa5]+.*$/.test(text); break;
    case 'enus': return /a-zA-Z*/.test(text); break;
  }
}