import * as html from 'html5parser'
import { init, ast2string } from '../packages/html'
import rules from '../packages/rules/html'
// import { needtranslate, koAttrReast } from '../packages/utils'
import scriptinit from '../packages/rules/script'
import dataBind from './data-bind'
import hasAttr from './has-attr'
const { koTagRule, koTextRule } = rules

const input = `
            <div data-bind="text:'中国'"></div>
    `;
 
    // const input = `
    // <h2 params="goWhere:height,from:{title:'流感'},middleRoute:function(){ address + '地址'}">中文翻译</h2>`
// var ast = init(input, {
//   tagRule: [
//     node => {
//       let cache = []
//       let filterAttrs = []
//       node.attributes.forEach(v => {
//         let nativeAttrs = ['title','placeholder','value']
//         let _index = nativeAttrs.indexOf(v.name.value)
//         if(_index >= 0 && needtranslate(v.value.value)){
//           filterAttrs.push(nativeAttrs[_index])
//           let quote = v.value.quote === "'"? '"':"'"
//           cache.push(`${nativeAttrs[_index]}:${quote}${v.value.value}${quote}`)
//           node.nativeAttrs = cache
//         }
//       })
//       node.attributes = node.attributes.filter(v => {
//         return filterAttrs.indexOf(v.name.value) < 0
//       })
//     },
    
//     node => {
//       console.log(node.nativeAttrs)
//       if(Array.isArray(node.nativeAttrs)){
//         let dataBindAttr = null
//         let hasDataBind = node.attributes.some(function(attr,index){
//           if(attr.name.value === "data-bind"){
//               dataBindAttr = attr
//               return true
//           }else{
//             return false
//           }
//         })
//         if(hasDataBind){
//             koAttrReast(dataBindAttr,node,hasAttr)
//         }else{
//           let attrs = node.nativeAttrs
//           let value = "attr:{"
//           attrs.forEach(v => {
//             value += `${v},`
//           })
//           value = value.slice(0,-1)
//           node.attributes.push(
//             {
//               value:{value:value + "}",quote:"'"},
//               name:{value:"data-bind"}
//             }
//           )
//         }
//       }
//       node.attributes.forEach(v => {
//         if((v?.name?.value === "data-bind"|| v?.name.value === "params" || v?.name.value === "options") && needtranslate(v.value?.value)){
//             koAttrReast(v,node,dataBind)
//         }

//       })
//     },
//     node => {

//     }
//   ],
//   scriptRule: [
//     jsast => {
//       debugger
//       let str = scriptinit(jsast)
//     }
//   ],
//   textRule: [
//     node => {
//       //纯文本
//      node.value = `<!-- ko text: cb.lang.tempalte('xxx/*${node.value}*/')--><!-- /ko -->`
//     }
//   ]
// })
debugger
var ast = init(input,{
  tagRule:koTagRule,
  textRule:koTextRule
})
var result = ast2string(ast)
console.log(result)
