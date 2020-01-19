import * as html from 'html5parser'
import { init, ast2string } from '../packages/html'
const input = ` <!doctype html>
    <html>
      <body>
        <h1 id="hello">Hello world</h1>
        <h2 title="有没有翻译">中文翻译</h2>
        <h3 data-bind="text: '你好'">世界</h3>
        <script>
          window.alert('error')
          function aaa (p) {
            var b = p + '1'
            console.log(b);
          } 
        </script>
      </body>
    </html>
    `;
var ast = init(input, {
  tagRule: [
    node => {
    }
  ],
  scriptRule: [
    jsast => {
    }
  ],
  textRule: [
    node => {
    }
  ]
})

var result = ast2string(ast)
console.log(result)
debugger
