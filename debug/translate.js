import i18nparser from "../packages"
var path = require('path')
var config = {
  ignoreDirectory: ["/mock", "/vue-pricecomparation", "botemplate.tpl.html", "/pinyin", "/login.html", "/ajaxfileupload", "/diagram-viewer", "/lodash", "/js/uui1.0.0", "/js/vendor", "/js/third", "/umd", "/report", "/h5", "/build", "/css", "/example", "/img", "code/index.html"],
  sourcePath: "code",
  outputPath: "coderesult",
  needTranslate: null,
  type: 'ko',
  resourceIdPrefix: 'FE_'
}
i18nparser.translate(config)({
  extractCallback: function (data) {
    console.log('==end==')
  }
})
