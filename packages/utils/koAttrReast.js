

let koAttrReast = function(dataBindValue,node,strReturn){
    let varStr = "var a = "//拼凑为reast可识别的结构
    let value = dataBindValue.value.value
    if(value.trim()[0] === "{"){//data-bind="text:xxx,html:xxx" => data-bind="{text:xxx,html:xxx}"
        value = varStr + value 
    }else{
        value = `${varStr}{${value}}`
    }
    dataBindValue.value.value = value
    let str = strReturn(dataBindValue,node)
    let varStrTrim = varStr.replace(/\s+/g,"")
    str = str.slice(varStrTrim.length)
    dataBindValue.value.value = str
}
export default koAttrReast