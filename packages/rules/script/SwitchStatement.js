import chooseRule from './chooseRule'
var rule = (expression) => {
  expression.cases.forEach(function (caseitem) {
    chooseRule(caseitem)
  })
}
export default rule