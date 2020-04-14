// 如果是text 且除去前后空格后以&nbsp;开头，则要把开头的&nbsp; 拆分出来
const rule = (node) => {
  var text = node.value
  text = text.replace(/\n/g, '')
  text = text.trim()
  var preText = ""
  if (text.startsWith('&nbsp;')) {
    var nbspArray = node.value.split('&nbsp;')
    while (nbspArray.length > 0) {
      var item = nbspArray.shift()
      if (item === '' || item === '\n') {
        preText += item ? item : '&nbsp;'
      }
    }
    node.value = text
  }
  node._preText = preText

}
export default rule