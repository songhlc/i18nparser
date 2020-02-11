import * as html from 'html5parser'
import { init, ast2string } from '../packages/html'
import rules from '../packages/rules/html'
// import { needtranslate, koAttrReast } from '../packages/utils'
const { koTagRule, koTextRule } = rules

const input = `
<div>
<div data-bind="text:'万岁'">生命物件</div>
<div placeholder="黄i的"></div>
<div data-bind="attr:{href:'yonyou.com'}" title="用友网络"></div>
<div data-bind="text:'活着正好'">武汉加油</div>
<!-- ko text:'我们',attr:{we:'gg',title:'美国',href:'www.baidu.com'} -->

<!-- /ko -->
<!-- ko foreach: {data: $root.fceditData, as: 'row'} -->

<!-- /ko -->
<!-- 中国人 -->
</div>
    `;
/**
 * 
 */

var ast = init(input,{
  tagRule:koTagRule,
  textRule:koTextRule
})
var result = ast2string(ast)
console.log(result)
