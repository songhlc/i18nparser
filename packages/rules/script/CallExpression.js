import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.arguments.forEach((args, index) => {
    chooseRule(args, expression.arguments, index)
  })
}
export default rule