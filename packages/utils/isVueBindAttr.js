
// 判断属性值是否是vue绑定属性 :props="xxx" 和 v-bind:porps="xxx" @click v-model, v-show
export default function isVueBindAttr (text) {
  if (!text) {
    return false
  }
  if (typeof (str) === "string") {
    text = text.trim()
  }
  return text.startsWith(':') || text.startsWith('v-bind:') || text.startsWith('v-') || text.startsWith('@')
}