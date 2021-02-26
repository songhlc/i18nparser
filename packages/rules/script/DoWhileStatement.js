import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.test && chooseRule(expression.test)
  expression.body && chooseRule(expression.body)
}
export default rule