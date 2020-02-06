import logicalExpression from './logicalExpression'
import literal from './literal'
export default expression => {
  switch (expression.type) {
    case 'LogicalExpression': logicalExpression(expression); break;
    case 'Identifier': break;
    case 'Literal': literal(expression)
  }
}