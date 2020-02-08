import rawattr from './rule-vue-rawattr'
import rawtext from './rule-vue-rawtext'
import props from './rule-vue-props'
import dynamictext from './rule-vue-dynamictext'
var rules = {
  vueTagRule: [rawattr, props],
  vueTextRule: [dynamictext, rawtext]
}
export default rules
