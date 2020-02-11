import logicalExpression from './logicalExpression'
import literal from './literal'
import ObjectExpression from './ObjectExpression'
import ArrayExpression from './ArrayExpression'
import FunctionExpression from './FunctionExpression'
import BlockStatement from './BlockStatement'
import ExpressionStatement from './ExpressionStatement'
import CallExpression from './CallExpression'
import VariableDeclaration from './VariableDeclaration'
import IfStatement from './IfStatement'
import ReturnStatement from './ReturnStatement'
import AssignmentExpression from './AssignmentExpression'
import MemberExpression from './MemberExpression'
import BinaryExpression from './BinaryExpression'
import ConditionalExpression from './ConditionalExpression'
import { print } from 'recast'
var chooseRule = (expression, parentNode, attrKey) => {
  var code = print(expression).code

  // if (code.indexOf('this.a > 0') >= 0) {
  //   console.log(code)
  //   debugger
  // }
  switch (expression.type) {
    case 'ConditionalExpression': ConditionalExpression(expression); break; // a ? 1 : 2
    case 'BinaryExpression': BinaryExpression(expression); break;  // a == b
    case 'LogicalExpression': logicalExpression(expression); break; // a || b
    case 'Identifier': break; // var a
    case 'Literal': literal(expression, parentNode, attrKey); break; // "test"
    case 'ObjectExpression': ObjectExpression(expression); break; //{a:1,b:2}
    case 'ArrayExpression': ArrayExpression(expression); break; // [1,2,3,4]
    case 'FunctionExpression': FunctionExpression(expression); break; // function () {}
    case 'BlockStatement': BlockStatement(expression); break; // return {xxxxx};
    case 'ReturnStatement': ReturnStatement(expression); break;//chooseRule(expression.argument); break; // 同上
    case 'ExpressionStatement': ExpressionStatement(expression); break; // this.xx = 'test'
    case 'CallExpression': CallExpression(expression); break;// cb("a", "中文")
    case 'VariableDeclaration': VariableDeclaration(expression); break; // var a
    case 'IfStatement': IfStatement(expression); break; // if (a == "中文")
    case 'AssignmentExpression': AssignmentExpression(expression); break; // a = "test"
    case 'MemberExpression': MemberExpression(expression); break; // console.log
    case 'ThisExpression': break; // this
    default: console.log("notexist:" + expression.type);
  }
}
export default chooseRule