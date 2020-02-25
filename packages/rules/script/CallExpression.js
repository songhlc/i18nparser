import chooseRule from './chooseRule'
var rule = (expression) => {
  if (expression.callee.type == "MemberExpression") {
    if (expression.callee.object.name === "console") {
      return
    }
  }
  expression.arguments.forEach((args, index) => {
    chooseRule(args, expression.arguments, index)
  })
  chooseRule(expression.callee)
}
export default rule