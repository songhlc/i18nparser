import chooseRule from './chooseRule'
var rule = (expression) => {
  chooseRule(expression.block)
  chooseRule(expression.handler)
}
export default rule