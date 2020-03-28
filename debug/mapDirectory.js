import mapDirectory from '../packages/directorymapper'
import { writeFile, wordMapping, getGlobalData } from '../packages/utils'
import { init as vueinit } from '../packages/vue'
import scriptinit from '../packages/script'
import { init as htmlinit, ast2string } from '../packages/html'
import htmlrules from '../packages/rules/html'
const { vueTagRule, vueTextRule, koTagRule, koTextRule } = htmlrules
const rootDir = '/Users/windknow/git/cpu-relief/' // "" //
const sourceDir = 'code' // "code" //rootDir + "src" //
const destDir = 'coderesult' // "coderesult" //rootDir + "src" //
const wordDir = 'coderesult' // rootDir //
getGlobalData.ignoreDirectory = [
  '/js',
  '/umd',
  '/report',
  '/h5',
  '/build',
  '/css',
  '/example',
  '/img'
]
var type = 'ko'
mapDirectory(
  sourceDir,
  function(path, extendsion, fileData) {
    switch (extendsion) {
      case 'vue':
        vueparser(path, fileData)
        break
      case 'js':
        jsparser(path, fileData)
        break
      case 'html':
        htmlparser(path, fileData)
        break
      case 'ejs':
        htmlparser(path, fileData)
        break
    }
  },
  function() {
    writeFile(wordDir + '/words.json', JSON.stringify(wordMapping))
  }
)
function output(path, strFileData) {
  path = path.replace(sourceDir, destDir)
  writeFile(path, strFileData)
}
function vueparser(path, input) {
  var result = vueinit(input)
  output(path, result)
}
function jsparser(path, input) {
  try {
    var result = scriptinit(input)
    output(path, result)
  } catch (e) {
    console.error('文件' + path + ': js解析出错')
  }
}
function htmlparser(path, input) {
  var rules = {}
  if (type == 'ko') {
    rules = {
      tagRule: koTagRule,
      textRule: koTextRule
    }
  } else {
    rules = {
      tagRule: vueTagRule,
      textRule: vueTextRule
    }
  }
  var result = htmlinit(input, rules)
  output(path, ast2string(result))
}
