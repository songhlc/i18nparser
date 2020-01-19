import init from '../init'
import * as html from 'html5parser'
import ast2string from '../ast2string'
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
describe('测试init', () => {
  // 这是mocha的玩法，jest可以直接兼容
  it('测试空tagRule，空scriptRule，空textRule', () => {
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
    expect(result == input).toBe(true);
    expect(result).toMatchSnapshot()
  })
  it('测试textRule', () => {
    var ast = init(input, {
      textRule: [
        node => {
          node.value = 'textrule规则'
        }
      ]
    })
    var result = ast2string(ast)
    expect(result == input).toBe(false);
    expect(result).toMatchSnapshot()
  })
  it('测试tagRule 找到data-bind 添加一个自定义属性data-i18nparser', () => {
    var ast = init(input, {
      tagRule: [
        node => {
          if (node.attributes.filter(attr => {
            return attr?.name?.value == 'data-bind'
          }).length > 0) {
            node.attributes.push({
              name: {
                value: "data-i18nparser",
                type: "Text"
              },
              value: {
                "quote": '"',
                "value": "i18nparser"
              }
            })
          }

        }
      ]
    })
    var result = ast2string(ast)
    expect(result == input).toBe(false);
    expect(result).toMatchSnapshot()
  })
})
