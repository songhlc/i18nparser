import rawattr from './rule-vue-rawattr'
import rawtext from './rule-vue-rawtext'
import props from './rule-vue-props'
var rules = {
  vueTagRule: [rawattr, props],
  vueTextRule: [rawtext]
}
export default rules
