init i18nparser
将前端代码解析成AST后，抽取中文词条并翻译

计划
1.html
2.vue
3.js
4.jsx

html依赖html5parser转换成ast。
js使用recast解析
先基于ko和vue 进行翻译处理。
资源id+注释
中文 -》 cb.lang.template("YS_PUR_portal-fe_L_00053199") /* "保存成功" */