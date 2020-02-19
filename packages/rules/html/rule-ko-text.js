import { getResourceId, TRANSLATE_METHOD, koAttrReast } from '../../utils'
const rule = (node) => {
    if (node._isComment) {
        if (/[\s]*ko[\s]+/.test(node.value)) {
            node.value = node.value.replace(/[\s]*ko[\s]+/, "")
            node.value = koAttrReast(node)
            node.value = " ko " + node.value
        }
    } else {
        // html comment中出现(会有bug
        var comment = node.value.replace(/\(|\)/g, "");
        node.value = `<!-- ko text: ${ TRANSLATE_METHOD }('${ getResourceId(node.value) }'/*${ comment }*/)--><!-- /ko -->`
    }
}

export default rule