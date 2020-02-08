import chooseRule from './chooseRule'
const rule = expression => {
    expression.declarations.forEach(declaration => {
        chooseRule(declaration.init)
    })
}
export default rule