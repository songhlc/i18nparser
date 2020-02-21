import chooseRule from './chooseRule'
var rule = (expression) => {
  if (expression.test) {
    chooseRule(expression.test)
  }
  chooseRule(expression.body)
}
export default rule