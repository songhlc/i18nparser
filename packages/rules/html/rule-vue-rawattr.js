/**
 * 比如 placeholder
 * 等这种纯html属性 以及自定义组件
 * <group title="我的真实姓名：" class="form-group">
 * 
 * @param {*} node 
 */
// <group :title="cb.template.lang('xxxid'/*123*/)" class="form-group"></group>
var rule = node => {
  if (node.attributes) {
    node.attributes.forEach(v => {
      debugger
    })
  }
}
export default rule