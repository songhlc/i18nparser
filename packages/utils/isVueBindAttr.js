
// 判断属性值是否是vue绑定属性 :props="xxx" 和 v-bind:porps="xxx"
export default function isVueBindAttr (text) {
  if (!text) {
    return false
  }
  return text.startsWith(':') || text.startsWith('v-bind:')
}