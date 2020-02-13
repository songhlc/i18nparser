# 处理vue文件
.vue文件一般里面分为三种格式：
- template
- script
- style

我们先用html5parser 分成template和script两部分，分别用html和script进行处理。
最后再把template和script分别组合起来加上原来的style。返回.vue文件。

.vue中文用例

- `<Breadcrumb-item href="/home">首页<Breadcrumb-item>`
- `<h3>项目资料</h3>`
- `<Tab-pane label="立项资料" name="n1" >`
- `<button class="float-right ivu-btn-primary btn-primary" @click="lxckspls">查看审批历史</button>`
- `<Modal v-model="lbly" title="流标理由" @on-ok="ok" @on-cancel="cancel">`
-  `document.title = '友云采——让企业采购更简单'`
-  `//定标查看中标公示`
-  `root.$Message.success('当前单据没有走审批流')`
-  ```root.$Message.loading({
              content: '正在加载中...',
              duration: 0
            })```
- `var isPubTotal = bidOpenSheet.data.pubTotal == 1 ? '是' : '否'`
- `<span @click="doSwitch('n1')" :class="{lineActive:!isSourceHide}">进行中({{statistic.sts_4_count}})</span>`
- ` <Input v-model="searchName" icon="ios-search-strong" @on-click="searchSource" placeholder="请输入项目名称" style="width:80%"></Input>`
- ```{
            value:'1',
            label:'框架协议'
          },```
- `title: '执行组织',`
- `h('div', '询价发布时间'),`
- `h('div', params.row.archiveStatus=='1'?'已归档':'未归档')`
                          