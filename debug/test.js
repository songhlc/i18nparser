import * as recast from "recast";
const code = [
  "function add(a, b) {",
  "  return a +",
  "    // Weird formatting, huh?",
  "    b;",
  "}"
].join("\n");
const ast = recast.parse(code);
console.log(ast)
const add = ast.program.body[0];
const b = recast.types.builders;
ast.program.body[0] = b.variableDeclaration("var", [
  b.variableDeclarator(add.id, b.functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body
  ))
]);
add.params.push(add.params.shift());
const output = recast.print(ast).code;
debugger