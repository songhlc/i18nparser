import chooseRule from './chooseRule'
var rule = (expression) => {
  chooseRule(expression.alternate, expression, "alternate")
  chooseRule(expression.consequent, expression, "consequent")
}
export default rule