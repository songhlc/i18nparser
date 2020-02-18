import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.expressions.forEach(exp => {
    chooseRule(exp)
  })
}
export default rule