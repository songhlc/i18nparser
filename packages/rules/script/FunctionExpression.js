import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  expression.body.forEach((prop, index) => {
    chooseRule(prop, expression.body, index)
  })
}
export default rule