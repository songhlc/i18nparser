import chooseRule from './chooseRule'
var rule = (expression) => {
  // expression 分为left 和 right
  expression.properties.forEach(prop => {
    chooseRule(prop.value, prop, 'value')
  })
}
export default rule