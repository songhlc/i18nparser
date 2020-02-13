import chooseRule from './chooseRule'
var rule = (statement) => {
  chooseRule(statement.left, statement, "left")
  chooseRule(statement.right, statement, "right")
}
export default rule