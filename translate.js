var i18nparser = require("./lib/index.min.js")
var path = require('path')
var config = require("./packages/i18nparser.config.js")
i18nparser.translate(config)({
  type: 'vue'
})
