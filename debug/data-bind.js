/**
 * 解析纯javascript代码
 * 
 * @param {*} node 
 */
import * as recast from "recast"
import { needtranslate, TRANSLATE_METHOD, getResourceId } from '../packages/utils'
var rule = (attr,node) => {
    let str = ""
    
    var ast = recast.parse(attr.value.value)
    recast.visit(ast, {
        visitStatement: function (path) {
            // BinaryExpression  'a'+'b'
            var { node } = path
            node.loc.tokens.forEach(v => {
                if(needtranslate(v.value)){
                    let quote = attr.value.quote === "'"? '"':"'"
                    v.value = TRANSLATE_METHOD + '(' + quote + getResourceId(v.value?.value) + quote + '/*' + v.value.slice(1,-1) + '*/)'
                }

                str += v.value
            })
            var output = recast.print(node).code
            console.log('visitStatement:', output)
            return false
        },
        // 便利属性定义 var b = 'test'
        visitIdentifier: function (path) {
            var { node } = path
            var output = recast.print(node).code
            console.log('visitIdentifier:', output)
            return false
        },
        visitExpressionStatement: function (path) {
            var { node } = path
            // 判断参数里是否包含call和literal
            var output = recast.print(node).code
        return false
        }
    })
    return str
}
export default rule