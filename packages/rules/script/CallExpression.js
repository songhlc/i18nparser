import chooseRule from './chooseRule'
var rule = (expression) => {
  var iscblangtemplate = false
  if (expression.callee.type == 'MemberExpression') {
    if (expression.callee.object.name === 'console') {
      return
    }
    try {
      if (expression.callee.property.name === 'template') {
        if (expression.callee.object.type === 'MemberExpression' && expression.callee.object.property.name === 'lang') {
          if (expression.callee.object.object.name === 'cb') {
            iscblangtemplate = true
          } else if (expression.callee.object.object.property.name === 'cb'){
            iscblangtemplate = true
          }
        }
      }
    } catch (e) {
      debugger
      console.log('===find cb.lang.tempalte error===', e)
    }
  }
  expression.arguments.forEach((args, index) => {
    // cb.lang.template('中文ddd', {a: a}) => cb.lang.template('xxx-res-id', {a: a})
    if (args.type === 'Literal' && iscblangtemplate && expression.arguments.length > 1) {
      expression.arguments._iscblang = true
    }
    chooseRule(args, expression.arguments, index)
  })
  chooseRule(expression.callee)
}
export default rule
