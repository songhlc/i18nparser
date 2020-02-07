import { needtranslate,koAttrReast } from '../../utils'
import hasAttr from '../../../debug/has-attr'
import dataBind from '../../../debug/data-bind'
const rule = node => {
    if(Array.isArray(node.nativeAttrs)){
        let dataBindAttr = null
        let hasDataBind = node.attributes.some(function(attr,index){
          if(attr.name.value === "data-bind"){
              dataBindAttr = attr
              return true
          }else{
            return false
          }
        })
        if(hasDataBind){
            koAttrReast(dataBindAttr,node,hasAttr)
        }else{
          let attrs = node.nativeAttrs
          let value = "attr:{"
          attrs.forEach(v => {
            value += `${v},`
          })
          value = value.slice(0,-1)
          node.attributes.push(
            {
              value:{value:value + "}",quote:"'"},
              name:{value:"data-bind"}
            }
          )
        }
      }
      node.attributes.forEach(v => {
        if((v?.name?.value === "data-bind"|| v?.name.value === "params" || v?.name.value === "options") && needtranslate(v.value?.value)){
            koAttrReast(v,node,dataBind)
        }

      })
}
export default rule