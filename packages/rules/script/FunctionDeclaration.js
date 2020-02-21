import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  chooseRule(expression.body)
}
export default rule