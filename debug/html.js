import * as html from 'html5parser'
import { init, ast2string } from '../packages/html'
import rules from '../packages/rules/html'
// import { needtranslate, koAttrReast } from '../packages/utils'
const { koTagRule, koTextRule } = rules

const input = `
<style type="text/css">
.floatLeft{
    float: left;
}
</style>
<div class="ibox" id="inventorycheck">

<y-boxfilter params="title: '供应商入库单核对情况'">
</y-boxfilter>
<y-boxcontent params="style:{minHeight:'200px',marginBottom:'120px'}">
    <div class="row">
        <y-form params="labelWidth:'80px'">
            <div style="width: 360px;" class="col-md-4">
                <div class="floatLeft" style="width:150px;">
                    <y-datepicker params='placeholder:"开始日期", data: $root.begindate'></y-datepicker>
                </div>
                <div class="floatLeft" style="line-height: 32px;margin: 0 5px;">至</div>
                <div class="floatLeft" style="width:150px;">
                    <y-datepicker params='placeholder:"结束日期", data: $root.enddate'></y-datepicker>
                </div>
            </div>
            <div class="col-md-4">
                <y-formitem params="label:'组织多选', style:{height:'auto'}">
                    <y-refer-org params="multiple:true,selectedRows:$root.orgs,selectedId:ko.observableArray([]),onOk:$root.selectOrgOnOk"></y-refer-org>
                </y-formitem>
            </div>
            <div class="col-md-3"  style="width:350px;">
                <y-formitem params="label:'供应商单选'">
                    <y-refer-supply params="value: $root.supplyselectedValue">
                    </y-refer-supply>
                </y-formitem>
            </div>
            <button class="btn btn-primary" data-bind="click:$root.queryData">查询</button>
        </y-form>
    </div>
    <y-grid params="minheight:'484px',maxheight:'auto',onPageChange:$root.onPageChange,onSizeChange:$root.onSizeChange,isStripe: true,columns:$root.columns,rows: $root.rows,pagination:true,totalCount: $root.totalCount,pageSize:$root.pageSize,pageIndex:$root.pageIndex"></y-grid>
</y-boxcontent>
</div>
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
var ast = init(input,{
  tagRule:koTagRule,
  textRule:koTextRule
})
var result = ast2string(ast)
console.log(result)
