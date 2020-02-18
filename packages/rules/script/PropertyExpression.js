import chooseRule from './chooseRule'
var rule = (expression) => {
  chooseRule(expression.value,expression,'value')
}
export default rule