import { needtranslate,koAttrReast } from '../../utils'
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
          dataBindAttr.nativeAttrs = node.nativeAttrs
          dataBindAttr.value.value = koAttrReast(dataBindAttr)
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
          node.attributes.forEach(v => {
            if(v?.name.value === "data-bind"  && needtranslate(v.value?.value)){
                v.value.value = koAttrReast(v)
            }
          })
        }
      }
      node.attributes.forEach(v => {
        if((v?.name.value === "params" || v?.name.value === "options") && needtranslate(v.value?.value)){
            v.value.value = koAttrReast(v)
        }
      })
}
export default rule