var i18nparser = require("./lib/index.min.js")
var path = require('path')

var config = {
  ignoreDirectory: ["/js", "/umd", "/report", "/h5", "/build", "/css", "/example", "/img"],
  sourcePath: "code",
  outputPath: "coderesult",
  needTranslate: null,
  type: 'ko'
}
i18nparser.translate(config)({
  type: 'vue'
})
