import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.body.forEach(body => {
    chooseRule(body)
  })
}
export default rule