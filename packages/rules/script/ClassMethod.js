import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.body && chooseRule(expression.body)
}
export default rule