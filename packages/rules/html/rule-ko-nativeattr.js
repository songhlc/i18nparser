import { needtranslate } from '../../utils'
const rule = (node) => {
  let cache = []
  let filterAttrs = []
  node.attributes.forEach(v => {
    let nativeAttrs = ['data-title', 'title', 'placeholder', 'value']
    let _index = nativeAttrs.indexOf(v.name.value)
    if (_index >= 0 && needtranslate(v.value.value)) {
      filterAttrs.push(nativeAttrs[_index])
      let quote = v.value.quote === "'" ? '"' : "'"
      // cache.push(`${nativeAttrs[_index]}:${quote}${v.value.value}${quote}`)
      cache.push({
        name: nativeAttrs[_index],
        value: v.value.value
      })
      node.nativeAttrs = cache
    }
  })
  node.attributes = node.attributes.filter(v => {
    return filterAttrs.indexOf(v.name.value) < 0
  })
}
export default rule