import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  expression.elements.forEach((el, index) => {
    chooseRule(el, expression.elements, index)
  })
}
export default rule