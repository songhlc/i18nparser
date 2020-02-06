import chooseRule from './chooseRule'
var rule = expression => {
  debugger
  // expression 分为left 和 right
  chooseRule(expression.left)
  chooseRule(expression.right)
}
export default rule