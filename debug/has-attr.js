/**
 * 解析纯javascript代码
 * 
 * @param {*} node 
 */
import * as recast from "recast"
import { needtranslate, TRANSLATE_METHOD, getResourceId } from '../packages/utils'
var rule = (attr,outerNode) => {
    let str = ""
    let attrStr = ""
    var ast = recast.parse(attr.value?.value)
    recast.visit(ast, {
        visitStatement: function (path) {
            // BinaryExpression  'a'+'b'
            var { node } = path
            let array =  node.loc.tokens
            let startIndex = 0//attr:{xy:123}是{的下标
            let endIndex = 0;//attr:{xy:123}是}的下标

            for(let i = 0; i < array.length; i++){
                let ele = array[i]
                if(ele.value === "{" && array[i-2].value === "attr"){
                    startIndex = i
                    break;
                }
                str += ele.value
            }
            if(startIndex == 0){//data-bind里面没有attr
                // for(let i = startIndex; i < array.length; i++){
                //     let ele = array[i]
                //     // str += ele.value
                // }
                // str += ","//逗号隔开
                //node.nativeAttrs格式['placeholer:xxx',title:'xxx',xxx:'xxx']数组
                str = str.slice(0,-1) + ','
                outerNode.nativeAttrs.forEach(item => {
                    str += item
                })
                str += '}'
            }else{
                let reduceNum = 0;
                for(let i = startIndex; i < array.length; i++){
                    let ele = array[i]
                    
                    if(ele.value === "{" && ele.type === "Punctuator"){
                        reduceNum += 1
                    }
                    if(ele.value === "}" && ele.type === "Punctuator"){
                        reduceNum -= 1
                    }
                    attrStr += ele.value//拼接字符串

                    if(reduceNum === 0 ){
                        endIndex = i
                        break;
                    }
                }
                let attrValueStr = attrStr.slice(1,-1)//去掉前后括号
                outerNode.nativeAttrs.forEach(item => {
                    attrValueStr += `,${item}`
                })
                str += '{' + attrValueStr + '}'
            }
            if(startIndex > 0 &&  endIndex < array.length - 1){
                for(let i = endIndex+1; i < array.length; i++){
                    let ele = array[i]
                    str += ele.value
                }
            }
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