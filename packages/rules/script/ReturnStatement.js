import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  if (expression.argumets) {
    chooseRule(expression.argument)
  }
}
export default rule