import ast2string from '../ast2string'
import * as html from 'html5parser-fork'

describe('测试ast2string', () => {
  // 这是mocha的玩法，jest可以直接兼容
  it('转换结果相等', () => {
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
    var ast = html.parse(input)
    var result = ast2string(ast)
    debugger
    // 这里的断言实际上和chai的expect是很像的
    expect(result == input).toBe(true);
    expect(result).toMatchSnapshot()
  })
})
