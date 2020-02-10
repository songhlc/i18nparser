import chooseRule from './chooseRule'
import { print } from 'recast'
var rule = (expression) => {
  chooseRule(expression.object)
  chooseRule(expression.property)
}
export default rule