import chooseRule from './chooseRule'
var rule = (statement) => {
  // expression 分为left 和 right
  chooseRule(statement.right, statement, 'right')
}
export default rule