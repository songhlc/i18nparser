import { init, ast2string } from '../html'
import rules from '../rules/html'
export default (input) => {
    const { koTagRule, koTextRule } = rules
    var ast = init(input, {
        tagRule: koTagRule,
        textRule: koTextRule
      })
    return ast2string(ast)
}


