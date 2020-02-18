import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  expression.elements.forEach((el, index) => {
    // 可能存在el为空的情况
    if (el) {
      chooseRule(el, expression.elements, index)
    }
  })
}
export default rule