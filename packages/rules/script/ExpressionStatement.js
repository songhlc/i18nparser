import chooseRule from './chooseRule'
var rule = (expressionStatement) => {
  chooseRule(expressionStatement.expression)
}
export default rule