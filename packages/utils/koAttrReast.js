import * as recast from 'recast';
import scriptRule from '../../packages/rules/script'
import chooseRule from '../rules/script/chooseRule'
import globalData from './getGlobalData'
import { builders as b } from "ast-types";
// 如果 v?.name.value === "options" 要保留左边的{
let koAttrReast = function (koTagNode, needFlag) {
    let varStr = "var a = "//拼凑为reast可识别的结构
    // 空字符串是允许存在的
    let value = koTagNode.value?.value != undefined && koTagNode.value?.value != null ? koTagNode.value.value : koTagNode.value
    let hasBrackets = value.trim()[0] === "{"
    if (hasBrackets) {//data-bind="text:xxx,html:xxx" => data-bind="{text:xxx,html:xxx}"
        value = varStr + value
    } else {
        value = `${ varStr }{${ value }}`
    }
    try {
        let recastNode = recast.parse(value)
        if (koTagNode.nativeAttrs) {
            let declaration = recastNode.program.body[0]?.declarations[0]
            let properties = declaration.init.properties
            let attrProperty = properties.filter(v => v.key.name === "attr")[0]
            if (attrProperty) {
                koTagNode.nativeAttrs.forEach(nativeAttr => {
                    attrProperty.value.properties.push(
                        b.property(
                            "init",
                            b.identifier(nativeAttr.name),
                            b.literal(nativeAttr.value)
                        )
                    )
                })
            } else {
                let arr = []
                koTagNode.nativeAttrs.forEach(nativeAttr => {
                    arr.push(
                        b.objectProperty(
                            b.identifier(nativeAttr.name),
                            b.literal(nativeAttr.value)
                        )
                    )

                })
                let property = b.property(
                    "init",
                    b.identifier('attr'),
                    b.objectExpression(arr)//expresson里面数组，看label-types objectExpression
                )
                properties.push(property)
            }
            for (let i = 0; i < properties.length; i++) {
                const ele = properties[i];
                if (ele.key.name === "i18n") {
                    ele.key.name = 'i19n'
                    continue;
                }
                chooseRule(ele)
            }
        } else {
            let declaration = recastNode.program.body[0]?.declarations[0]
            let properties = declaration.init.properties
            for (let i = 0; i < properties.length; i++) {
                const ele = properties[i];
                if (ele.key.name === "i18n") {
                    ele.key.name = 'i19n'
                    continue;
                }
                chooseRule(ele)
            }
        }
        let str = recast.print(recastNode).code
        str = str.slice(varStr.length - 1).trim()//去掉var a = 
        // 把data-title转换成"data-title" 根据当前输入的括号来决定
        var curQuote = globalData.quote == '"' ? "'" : '"'
        str = str.replace(/data-title:/g, `${curQuote}data-title${curQuote}:`)
        if (!needFlag) {
            str = str.slice(1, -1)
        }
        return str
    } catch (e) {
        console.error("以下代码报错：" + value)
        throw Error(e)
    }   
}
export default koAttrReast