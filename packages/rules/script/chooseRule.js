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
import SwitchStatement from './SwitchStatement'
import SwtichCase from './SwtichCase'
import PropertyExpression from './PropertyExpression'
import NewExpression from './NewExpression'
import FunctionDeclaration from './FunctionDeclaration'
import ForStatemente from './ForStatemente'
import ForInStatement from './ForInStatement'
import TryStatement from './TryStatement'
import ArrowFunctionExpression from './ArrowFunctionExpression'
import SequenceExpression from './SequenceExpression'
import CatchClause from './CatchClause'
import TemplateLiteral from './TemplateLiteral'
import TemplateElement from './TemplateElement'
import { print } from 'recast'
var chooseRule = (expression, parentNode, attrKey) => {
  // if (code.indexOf('data () {') >= 0) {
  //   console.log(code)
  //   debugger
  // }
  var code = print(expression).code
  if (!expression) {
    console.log(JSON.stringify(expression))
    throw Error('expression.type should not be null')
  }
  switch (expression.type) {
    case 'SwitchStatement': SwitchStatement(expression); break;// switch () case
    case 'SwitchCase': SwtichCase(expression); break;
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
    case 'Property': PropertyExpression(expression); break;
    case 'NewExpression': NewExpression(expression); break; // new XXX()
    case 'FunctionDeclaration': FunctionDeclaration(expression); break; // function ()
    case 'ForInStatement': ForInStatement(expression); break;
    case 'SequenceExpression': SequenceExpression(expression); break;
    case 'ForStatement': ForStatemente(expression); break; // for ()
    case 'TryStatement': TryStatement(expression); break;
    case 'ArrowFunctionExpression': ArrowFunctionExpression(expression); break;
    case 'CatchClause': CatchClause(expression); break;
    case 'TemplateLiteral': TemplateLiteral(expression); break;
    case 'TemplateElement': TemplateElement(expression, parentNode, attrKey); break;
    case 'ThrowStatement': ;
    case 'EmptyStatement': ;
    case 'ContinueStatement': ;
    case 'ContinueStatement': ;
    case 'DebuggerStatement': ;
    case 'UpdateExpression': break;
    case 'ThisExpression': break; // this
    case 'BreakStatement': break;
    case 'UnaryExpression': break;
    default: console.log("notexist:" + expression.type + " ==" + code); break;
  }
}
export default chooseRule