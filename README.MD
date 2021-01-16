# i18nparser
将前端代码解析成AST后，抽取中文词条并翻译

## how to use
 ```
 import i18nparser from 'i18n-full-parser'
 i18nparser.translate(configPath)({
  type: 'vue'
})
 ```
## API
 ```
  configPath: String (path/to/config.js). default:（./i18nparser.config.js）
  type: String ("vue/ko/java"). set default rule for matched Node
 ```


## 计划
- 1.html
- 2.vue
- 3.js
- 4.jsx

#### html依赖html5parser转换成ast。
#### js使用recast解析
#### 先基于ko和vue 进行翻译处理。
#### 资源id+注释
#### 中文 -》 cb.lang.template("YS_PUR_portal-fe_L_00053199") /* "保存成功" */



## 如何开发与调试

- 1.快速rule验证推荐使用jest，通过测试用例来验证
- 2.使用vscode debug来调试 默认html表示调试debug/html.js 详见.vscode/launch.json

1.<div>中文</div> => <div data-bind="text:cb.template('xxx')"></div>  还是 
<div><!-- ko text: cb.lang.tempalte('xxx')--><!-- /ko --></div>

<div title="中文"></div>
2.<div data-bind="title:'中文'"></div> <input data-bind="attr:{placeholder:'中文'}"></input>

3.<div :param="{a:'中文', b:'中文2'}">

4.<div data-bind="text:'中文'">中阿顾问</div>

5.<div data-bind="{text:'中文', value:function(){return '现金'+ 'test'}}"></div> =>
<div data-bind="{text:'中文', value:function(){return cb.lang.template('xxxid')+ 'test'}}"></div>

6.<div data-bind="i18n:'xxx-id'">中文</div> =><div data-bind="">中文</div> => 转1

7.<div data-bind="attr:{title:'中文'}"></div>


8. <div options='{"title":"中文"}'> 

9. <y-modal params='{title:"中文"}'></y-modal>

10.<input placeholder="中文">

11.<y-checkbox params='{label:"中文"}'></y-checkbox>


12.<ko-export-excel-frontend params = "filename: '超市订单报表' +  new Date().format('yyyy-MM-dd'),exportText: '导出Excel', exportData: $root.exportData, disabled: excelDisable"></ko-export-excel-frontend>

13.<y-modal params="{textOk:'中文'}"></y-modal>

## ko自定义Tag属性params需要翻译的中文属性一般为 title,其他根据传入组件属性自己定义



##  ko-html规则汇总



update 
1.2.0:
由于同时存在 中文词条、中文词条：、中文词条:
三种类型，而已经翻译的词条就考虑不重复处理，所以在资源抽取时通过originData可以传入已经翻译过的词条，如果已经存在了类似的词条，就不重复翻译了，直接引用原有的。

理想情况是
如果已存在带冒号的，那么不带冒号的抽取后直接使用带冒号的cb.lang.shortTempalte(xxx).
shortTemplate为自己实现的函数，内部会删除翻译后的末尾冒号使用。