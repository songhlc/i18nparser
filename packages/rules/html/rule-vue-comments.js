/**
 * <!-- test -->
 * @param {*} node 
 */
// {{cb.template.lang('xxxid'/*中文*/)}}
var rule = node => {
  if (node.type == "Text" && !node._translated && node.whichTag == "comment") {
    node._translated = true
  }
}
export default rule