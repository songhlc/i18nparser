import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  chooseRule(expression.left)
  chooseRule(expression.right, expression, 'right')
}
export default rule