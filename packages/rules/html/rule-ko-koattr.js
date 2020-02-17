import { needtranslate,koAttrReast,getGlobalData } from '../../utils'
import * as recast from 'recast';
const rule = node => {
    /**
     * 首先，判断是否有原生属性
     *    有原生属-->
     *        判断有没有data-bind
     *            有data-bind --> 
     *                判断有没有attr-->
     *                  有attr-->找到下标添加字符
     *                  没有attr-->添加attr:{}
     *            没有data-bind
     *                直接添加data-bind:attr
     *    没有原生属性，直接替换data-bind里面的汉字
     */
    if(Array.isArray(node.nativeAttrs)){//只有data-bind才会有普通属性，params,options
        let dataBindAttr = node.attributes.filter(function(attr,index){
          return attr.name.value === "data-bind"
        })[0]
        if(dataBindAttr){
          getGlobalData.quote  =  dataBindAttr.value.quote
          dataBindAttr.nativeAttrs = node.nativeAttrs
          dataBindAttr.value.value = koAttrReast(dataBindAttr)
        }else{//没有data-bind
          let attrs = node.nativeAttrs
          let value = "attr:{"
          attrs.forEach(v => {
            value += `${v.name}:${v.value},`
          })
          value = value.slice(0,-1)
         
          node.attributes.push(
            {
              value:'',
              name:{value:"data-bind"}
            }
          )
          node.attributes.forEach(v => {
            if(v?.name.value === "data-bind"){
              v.nativeAttrs = node.nativeAttrs
                getGlobalData.quote  =  '"'
                let strAttr = koAttrReast(v)
                v.value = {value:''}
                v.value.value = '"' + strAttr + '"'
            }
          })
        }
    }else{
      node.attributes.forEach(v => {
        if((v?.name.value === "data-bind" || v?.name.value === "params" || v?.name.value === "options") && needtranslate(v.value?.value)){
          getGlobalData.quote  =  v.value.quote  
          v.value.value = koAttrReast(v)
        }
      })
    }
}
export default rule