import * as recast from 'recast';
import scriptRule from '../../packages/rules/script'
import chooseRule from '../rules/script/chooseRule'
import { builders as b } from "ast-types";
let koAttrReast = function (koTagNode) {
    let varStr = "var a = "//拼凑为reast可识别的结构
    // 空字符串是允许存在的
    let value = koTagNode.value?.value != undefined && koTagNode.value?.value != null ? koTagNode.value.value : koTagNode.value
    let hasBrackets = value.trim()[0] === "{"
    if (hasBrackets) {//data-bind="text:xxx,html:xxx" => data-bind="{text:xxx,html:xxx}"
        value = varStr + value
    } else {
        value = `${ varStr }{${ value }}`
    }
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
    str = str.slice(1, -1)
    return str
}
export default koAttrReast