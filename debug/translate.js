import i18nparser from "../packages"
var path = require('path')
var config = {
  ignoreDirectory: ["/js", "/umd", "/report", "/h5", "/build", "/css", "/example", "/img"],
  sourcePath: "code",
  outputPath: "coderesult",
  needTranslate: null,
  type: 'ko'
}
i18nparser.translate(config)({
  extractCallback: function (data) {
    console.log('==end==')
  }
})
