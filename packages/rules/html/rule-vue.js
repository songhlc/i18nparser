import rawattr from './rule-vue-rawattr'
import rawtext from './rule-vue-rawtext'
import props from './rule-vue-props'
import dynamictext from './rule-vue-dynamictext'
import comments from './rule-vue-comments'
var rules = {
  vueTagRule: [rawattr, props],
  vueTextRule: [comments, dynamictext, rawtext]
}
export default rules
