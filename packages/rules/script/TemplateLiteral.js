import chooseRule from './chooseRule'
var rule = expression => {
  // quasis没有考虑处理
  expression.quasis.forEach((quasis, index) => {
    chooseRule(quasis, expression.quasis, index)
  })
  expression.expressions.forEach(exp => {
    chooseRule(exp)
  })
}
export default rule
