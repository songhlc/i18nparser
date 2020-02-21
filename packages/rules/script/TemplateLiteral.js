import chooseRule from './chooseRule'
var rule = (expression) => {
  // quasis没有考虑处理
  expression.expressions.forEach(exp => {
    chooseRule(exp)
  })
}
export default rule