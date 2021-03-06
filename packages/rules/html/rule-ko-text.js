import { getResourceId, TRANSLATE_METHOD, koAttrReast, getGlobalData } from '../../utils'
const rule = (node) => {
    if (!node._preText) {
        node._preText = ""
    }
    if (node._isComment) {
        if (/[\s]*ko[\s]+/.test(node.value)) {
            node.value = node.value.replace(/[\s]*ko[\s]+/, "")
            node.value = koAttrReast(node)
            node.value = " ko " + node.value
        }
    } else {
        // html comment中出现(会有bug
        var comment = node.value.replace(/\(|\)/g, "");
        if (getGlobalData.ignoreComment) {
            node.value = node._preText + `<!-- ko text: ${ TRANSLATE_METHOD }('${ getResourceId(node.value) }')--><!-- /ko -->`
        } else {
            node.value = node._preText + `<!-- ko text: ${ TRANSLATE_METHOD }('${ getResourceId(node.value) }'/*${ comment }*/)--><!-- /ko -->`
        }
    }
    node._translated = true
}

export default rule