import chooseRule from './chooseRule'
import { print } from 'recast'
var rule = (statement) => {
  // expression 分为left 和 right

  statement.body.forEach((state, index) => {
    chooseRule(state, statement.body, index)
  })
  // } catch (e) {
  //   console.log(print(statement).code)
  //   debugger
  // }
}
export default rule