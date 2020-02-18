var i18nparser = require("./lib/index.min.js")
var path = require('path')
var config = require("./packages/i18nparser.config.js")
debugger
i18nparser.translate(config)({
  type: 'vue'
})
