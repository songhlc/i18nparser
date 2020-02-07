import logicalExpression from './logicalExpression'
import literal from './literal'
import ObjectExpression from './ObjectExpression'
import ArrayExpression from './ArrayExpression'
import FunctionExpression from './FunctionExpression'
import BlockStatement from './BlockStatement'
import ExpressionStatement from './ExpressionStatement'
import CallExpression from './CallExpression'
var chooseRule = (expression, parentNode, attrKey) => {
  switch (expression.type) {
    case 'LogicalExpression': logicalExpression(expression); break; // a || b
    case 'Identifier': break; // var a
    case 'Literal': literal(expression, parentNode, attrKey); break; // "test"
    case 'ObjectExpression': ObjectExpression(expression); break; //{a:1,b:2}
    case 'ArrayExpression': ArrayExpression(expression); break; // [1,2,3,4]
    case 'FunctionExpression': FunctionExpression(expression.body); break; // function () {}
    case 'BlockStatement': BlockStatement(expression.body); break; // return {xxxxx};
    case 'ReturnStatement': chooseRule(expression.argument); break; // 同上
    case 'ExpressionStatement': ExpressionStatement(expression); break; // this.xx = 'test'
    case 'CallExpression': CallExpression(expression); break;// cb("a", "中文")
    case 'IfStatement': ; // if (a == "中文")
    case 'VariableDeclaration': ; // var a 不处理
    default: console.log("notexist:" + expression.type);
  }
}
export default chooseRule