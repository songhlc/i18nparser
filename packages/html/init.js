import ast2string from './ast2string'
import * as html from 'html5parser-fork'
import * as recast from 'recast'
import { needtranslate } from '../utils'
import { scriptrules, tagrules, textrules } from './rules'

/**
 *
 * @param {*} input
 * @param {
 *  tagEnter: Function,
 *  scriptEnter: Function,
 *  textEnter: Function,
 *  leave: Function
 * } option
 */
function init(input, options = {}) {
  var isInScript = false
  var ast
  try {
    ast = html.parse(input)
  } catch (e) {
    debugger
  }
  var htmlInScript = false
  const { tagRule, scriptRule, textRule, leave } = options
  html.walk(ast, {
    enter: (node) => {
      if (node.type === html.SyntaxKind.Tag) {
        if (node.name == 'script') {
          isInScript = true
          node.attributes.forEach(function (attr) {
            // html模版（script引入）的方式还是文本来处理
            if (
              attr.name?.value == 'type' &&
              attr.value?.value == 'text/html'
            ) {
              isInScript = false
              htmlInScript = true
            }
          })
        }
        if (node.name === '!--') {
          if (node.body) {
            node.body[0]._isComment = true
          }
        }
        // 统一处理方式
        if (node.name === 'title') {
          if (node.body) {
            node.body[0]._isTitle = true
          }
        }
        if (node.name === 'style') {
          if (node.body) {
            node.body[0]._translated = true
          }
        }
        if (node.name !== '!doctype') {
          // node.open.value是tag的string值, 注释需要进行处理翻译
          if (needtranslate(node?.open?.value)) {
            // 默认规则
            tagrules.forEach((rule) => {
              if (!node._translated) {
                rule(node)
              }
            })
            // 自定义规则
            tagRule &&
              tagRule.forEach((rule) => {
                if (!node._translated) rule(node)
              })
          }
        }
      } else {
        // html中解析内部js
        if (isInScript) {
          var jsast
          jsast = recast.parse(node.value)
          // 默认规则
          scriptrules.forEach((rule) => {
            rule(jsast)
          })
          // 自定义规则
          scriptRule &&
            scriptRule.forEach((rule) => {
              rule(jsast)
            })
          // js转换后重新解析
          const output = recast.print(jsast).code
          node.value = output
        } else {
          if (needtranslate(node?.value)) {
            // 如果是script中的html模版
            if (htmlInScript) {
              // 重新调用init 进行解析处理
              var ast = init(node?.value, options)
              if (ast) {
                node.value = ast2string(ast)
              }
              htmlInScript = false
            } else {
              textrules.forEach((rule) => {
                if (!node._translated) rule(node)
              })
              // 自定义规则
              textRule &&
                textRule.forEach((rule) => {
                  if (!node._translated) rule(node)
                })
            }
          }
        }
      }
    },
    leave: (node) => {
      if (isInScript) {
        isInScript = false
      }
    },
  })

  return ast
}
export default init
