import chooseRule from './chooseRule'
var rule = (expression) => {
  if (expression.arguments) {
    expression.arguments.forEach((arg, index) => {
      chooseRule(arg, expression.arguments, index)
    })
  }
}
export default rule