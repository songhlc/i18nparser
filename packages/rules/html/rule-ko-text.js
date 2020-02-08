import { getResourceId, TRANSLATE_METHOD } from '../../utils'
const rule = (node) => {
    node.value = `<!-- ko text: ${TRANSLATE_METHOD}('${getResourceId()}'/*${node.value}*/)--><!-- /ko -->`
}

export default rule