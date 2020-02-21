import chooseRule from './chooseRule'
var rule = (expression) => {
  if (expression.test) {
    chooseRule(expression.test, expression, 'test')
  }
  expression.consequent.forEach(item => {
    chooseRule(item)
  })
}
export default rule