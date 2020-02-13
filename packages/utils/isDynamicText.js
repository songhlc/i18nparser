
// 判断是不是包含{{
export default function isDynamicText (text) {
  if (!text) {
    return false
  }
  var result = false
  try {
    result = text.indexOf("{{") >= 0 || text.indexOf("{ {") >= 0
  } catch (e) {
    debugger
  }
  return result
}