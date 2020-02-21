import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.test && chooseRule(expression.test)
  expression.alternate && chooseRule(expression.alternate) // 一般是BlockStatement
  expression.consequent && chooseRule(expression.consequent) // 一般是BlockStatement、或者expression
}
export default rule