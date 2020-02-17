import chooseRule from './chooseRule'
var rule = (expression) => {
  chooseRule(expression.object)
  chooseRule(expression.property)
}
export default rule