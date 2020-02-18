import chooseRule from './chooseRule'
var rule = (expression) => {
  // TODO var in xxx一般不会有中文吧 暂时忽略
  chooseRule(expression.body)
}
export default rule