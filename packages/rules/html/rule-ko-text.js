const rule = (node) => {
    node.value = `<!-- ko text: cb.lang.tempalte('xxx/*${node.value}*/')--><!-- /ko -->`
}

export default rule