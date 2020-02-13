import chooseRule from './chooseRule'
var rule = (expression) => {
  chooseRule(expression.test, expression, 'test')
  expression.consequent.forEach(item => {
    chooseRule(item)
  })
}
export default rule