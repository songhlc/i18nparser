import * as html from 'html5parser-fork'
function ast2String (ast, text) {
  if (!text) {
    text = ''
  }
  ast.forEach(item => {
    if (item.type === html.SyntaxKind.Text) {
      text += item.value
    } else if (item.type === html.SyntaxKind.Tag) {
      if (item.name === "!--") {//<!-- ko text:xxx --><!-- /ko -->
        var value = item.body ? item.body[0].value : ""
        text += item.open.value + value + item.close.value
      } else {
        text += '<' + item.name
        item.attributes && item.attributes.forEach((attr, index) => {
          var splitChar = " "
          if (attr.value) {
            // 可能存在没有引号的情况
            if (!attr.value.quote) {
              attr.value.quote = ""
            }
            text += splitChar + attr.name.value + '=' + attr.value.quote + attr.value.value + attr.value.quote
          } else {
            text += splitChar + attr.name.value
          }
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
    }
  })
  return text
}
export default ast2String
