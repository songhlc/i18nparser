# i18nparser
将前端代码解析成AST后，抽取中文词条并翻译

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

2.<div data-bind="title:'中文'"></div> <input data-bind="attr:{placeholder:'中文'}"></input>

3.<div :param="{a:'中文', b:'中文2'}">

4.<div data-bind="text:'中文'">中阿顾问</div>

5.<div data-bind="{text:'中文', value:function(){return '现金'+ 'test'}}"></div> =>
<div data-bind="{text:'中文', value:function(){return cb.lang.template('xxxid')+ 'test'}}"></div>

6.<div data-bind="i18n:'xxx-id'">中文</div> =><div data-bind="">中文</div> => 转1