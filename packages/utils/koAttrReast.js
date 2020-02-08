import * as recast from 'recast';
import scriptRule from '../../packages/rules/script'
let koAttrReast = function(koTagNode){
    let varStr = "var a = "//拼凑为reast可识别的结构
    let value = koTagNode.value.value
    if(value.trim()[0] === "{"){//data-bind="text:xxx,html:xxx" => data-bind="{text:xxx,html:xxx}"
        value = varStr + value 
    }else{
        value = `${varStr}{${value}}`
    }
    let str = ""
    let attrStr = ""
    let recastNode = recast.parse(value)
    let array =  recastNode.tokens
    let startIndex = 0//attr:{xy:123}是{的下标
    let endIndex = 0;//attr:{xy:123}是}的下标

    for(let i = 0; i < array.length; i++){
        let ele = array[i]
        if(ele.value === "{" && array[i-2].value === "attr"){
            startIndex = i
            break;
        }
        if(i == 1 || i == 2){//保持变量空格 与varStr一致
            str += ` ${ele.value}`
        }else{
            str += ele.value
        }
    }
    if(startIndex == 0){//data-bind里面没有attr
        str = str.slice(0,-1)
        //koTagNode.nativeAttrs格式['placeholer:xxx',title:'xxx',xxx:'xxx']数组
        if(koTagNode.nativeAttrs){
            str += ","
        }
        koTagNode.nativeAttrs && koTagNode.nativeAttrs.forEach(item => {
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
        koTagNode.nativeAttrs && koTagNode.nativeAttrs.forEach(item => {
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

    
    let reastStr = scriptRule(str)
    reastStr = reastStr.slice(varStr.length -1)
    return reastStr
}
export default koAttrReast