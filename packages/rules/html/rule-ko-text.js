import { getResourceId, TRANSLATE_METHOD,koAttrReast } from '../../utils'
const rule = (node) => {
    if(node._isComment){
        if(/[\s]*ko[\s]+/.test(node.value)){
            node.value = node.value.replace(/[\s]*ko[\s]+/,"")
            node.value = koAttrReast(node)
            node.value = " ko " + node.value
        }
    }else{
        node.value = `<!-- ko text: ${TRANSLATE_METHOD}('${getResourceId(node.value)}'/*${node.value}*/)--><!-- /ko -->`
    }
}

export default rule