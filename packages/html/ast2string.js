import * as html from 'html5parser'
function ast2String (ast, text) {
  if (!text) {
    text = ''
  }
  ast.forEach(item => {
    if (item.type === html.SyntaxKind.Text) {
      text += item.value
    } else if (item.type === html.SyntaxKind.Tag) {
      text += '<' + item.name
      item.attributes && item.attributes.forEach(attr => {
        if (attr.value)
          text += ' ' + attr.name.value + '=' + attr.value.quote + attr.value.value + attr.value.quote
      })
      if (item.name.toLowerCase() == '!doctype') {
        text += ' html'
      }
      text += '>'
      if (item.body) {
        text = ast2String(item.body, text)
      }
      if (item.close) {
        text += item.close.value
      }
    }
  })
  return text
}
export default ast2String
