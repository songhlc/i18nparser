import chooseRule from './chooseRule'
var rule = (statement) => {
  // expression 分为left 和 right
  debugger
  statement.body.forEach((state, index) => {
    chooseRule(state, statement.body, index)
  })
}
export default rule