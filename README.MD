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
