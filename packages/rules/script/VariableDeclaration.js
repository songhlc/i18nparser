import chooseRule from './chooseRule'
const rule = expression => {
    expression.declarations.forEach((declaration, index) => {
        declaration.init && chooseRule(declaration.init, declaration, "init")
    })
}
export default rule