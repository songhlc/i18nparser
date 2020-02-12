<template>
    <div v-transfer-dom>
        <div  class="disclaimer-mask" v-show="showmodal">
            <div class="i-feedback" style="text-align:left">
                <div class="form" style="margin-top:10px">
                <div class="form-title1">{{originatorNameText}}</div>
                <group title="单位/组织全称：" class="form-group">
                    <x-input
                    v-model="enterpriseName"
                    type="text"
                    is-type="china-name"
                    @on-change="setIconType(enterpriseName,'orgnameIcon')"
                    :icon-type="orgnameIcon"
                    placeholder="请输入您的单位或组织全称"
                    class="form-input"
                    novalidate
                    :show-clear="false"
                    ></x-input>
                </group>
                <group title="单位/组织所在地：" class="form-group">
                    <x-input
                    v-model="location"
                    placeholder="请输入您的单位或组织所在地"
                    class="form-input"
                    @on-change="setIconType(location,'locationIcon')"
                    :icon-type="locationIcon"
                    novalidate
                    :show-clear="false"
                    ></x-input>
                </group>
                <group title="联系人：" class="form-group">
                    <x-input
                    v-model="name"
                    placeholder="请输入您的真实姓名"
                    class="form-input"
                    @on-change="setIconType(name,'nameIcon')"
                    :icon-type="nameIcon"
                    novalidate
                    :show-clear="false"
                    ></x-input>
                </group>
                <group title="联系电话：" class="form-group">
                    <x-input
                    v-model="phone"
                    placeholder="填写真实联系电话以便联系您"
                    class="form-input"
                    @on-change="setIconType(phone,'phoneIcon')"
                    :icon-type="phoneIcon"
                    novalidate
                    type="number"
                    :show-clear="false"
                    ></x-input>
                </group>
                </div>
                <div class="form" style="margin-top:10px">
                <div class="form-title1">
                    <span>{{materialNameText}}</span>
                </div>
                <group  class="form-group no-title">
                    <div
                        v-for="(i,index) in materialist"
                        :key="index"
                        class="container"
                        style="box-shadow: 0 2px 15px 1px #B8BDF6;border-radius:4px"
                    >
                        <div>
                            <img :src="pg2del" width="14px" style="float: right;padding: 3px 4px;vertical-align: inherit" @click="del(index)"/>
                            <div style="clear:both;"></div>
                        </div>
                        <div style="width:100%;padding-bottom: 10px;">
                            <div style="float:left;width:5%;height:44px;line-height:44px;">{{index+1}}.</div>
                            <div style="float:left;width:95%;">
                                <selector 
                                    title="品类:" 
                                    v-model="i.materialClassName" 
                                    :options="list" 
                                    v-if="type==4"
                                    placeholder="请选择物资品类"
                                    class="form-input textarea-bg"
                                ></selector>
                                <x-input 
                                    title="物资:" 
                                    type="text"
                                    v-if="type==6||type==8||type==10"
                                    v-model="i.materialClassName"
                                    placeholder="请输入物资名称" 
                                    class="form-input textarea-bg"
                                ></x-input>
                                <x-input 
                                    title="数量:" 
                                    type="text"
                                    v-model="i.materialNum"
                                    placeholder="请输入数量,  如100个" 
                                    class="form-input textarea-bg"
                                ></x-input>
                                <x-input 
                                    title="单价:" 
                                    type="text"
                                    v-model="i.price"
                                    v-show="type==8"
                                    placeholder="请输入人民币单价" 
                                    class="form-input textarea-bg"
                                ></x-input>
                                <x-textarea
                                    title="要求:"
                                    :max="300"
                                    :placeholder="'请输入物资标准、规格型号、品牌或其他详细要求（0/300）'"
                                    v-model="i.materialDesc"
                                    required
                                    :height=40
                                    class="form-input textarea-bg"
                                ></x-textarea>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                    </div>
                    <div class="addMaterial">
                        <div @click="addmaterial" style="cursor: pointer;">+ 增加新物资</div>
                    </div>
                </group>
                </div>

                <div style="text-align: center;margin-top: 10px;">
                    <disclaimer></disclaimer>
                </div>

                <div class="form-submit" style="padding-bottom:20px">
                <flexbox>
                    <flexbox-item>
                    <div style="text-align: center;" class="submit" @click="submit">提交</div>
                    </flexbox-item>
                    <flexbox-item>
                    <div
                        style="text-align: center;background:#FFF;color:#333"
                        class="submit"
                        @click="close"
                    >关闭</div>
                    </flexbox-item>
                </flexbox>
                </div>
            </div>
        </div>
        <toast  v-model="isToast" @on-hide="toastHide" :text="toastMsg" :type="toastType"></toast>
    </div>
</template>
<script>
import axios from 'axios'
import { TransferDomDirective as TransferDom, XDialog, Group, XInput, XTextarea, XButton, Flexbox, FlexboxItem, Toast, Grid, GridItem, Selector  } from 'vux'
import { Debounce } from '../utils'
import Bus from '../bus'
import Disclaimer from './Disclaimer'
export default {
    name:'AddForm',
     directives: {
        TransferDom
    },
    components:{
        TransferDom, XDialog, Group, XInput, XTextarea, XButton, Flexbox, FlexboxItem, Toast, Grid, GridItem, Selector,Disclaimer
    },
    props:['showmodal','type'],
    watch:{
        showmodal(v){
            var el = document.getElementById('app')
            this.scrollTop = v ? document.documentElement.scrollTop : this.scrollTop
            el.hidden = v
            if (!v) {
                setTimeout(() => {
                    window.scrollTo({top:this.scrollTop||0, left:0})
                }, 200)
            }
        },
    },
    data(){
        return {
            originatorNameText:'',
            materialNameText:'',
            entNameText:'',
            enterpriseName:'',
            name:'',
            location:'',
            phone:'',
            nameIcon:'',
            orgnameIcon:'',
            locationIcon:'',
            phoneIcon:'',
            isToast: false,
            toastMsg: '提交成功',
            toastType: 'success',
            pg2del: require('../assets/del.png'),
            systemId: '',
            list: [
                {key: 'N95医用防护口罩（GB 19083-2010）及以上', value: 'N95医用防护口罩（GB 19083-2010）及以上'}, 
                {key: '医用外科口罩（YY0469-2011)及以上', value: '医用外科口罩（YY0469-2011)及以上'}, 
                {key: '防护服（GB 19082-2003）及以上', value: '防护服（GB 19082-2003）及以上'}, 
                {key: '护目镜', value: '护目镜'}, 
                {key: '医用帽', value: '医用帽'}, 
                {key: '一次性手术衣', value: '一次性手术衣'}, 
                {key: '医用一次性乳胶手套（GB 10213-2006）', value: '医用一次性乳胶手套（GB 10213-2006）'}, 
                {key: '防冲击眼罩', value: '防冲击眼罩'}, 
                {key: '防护面罩', value: '防护面罩'}, 
                {key: '隔离衣', value: '隔离衣'}, 
                {key: 'N95口罩', value: 'N95口罩'}, 
                {key: 'KN95口罩', value: 'KN95口罩'}, 
                {key: '其他防护物品', value: '其他防护物品'}
            ],
            materialist:[
                {materialClassName:'',materialNum:'',materialDesc:''}
            ]
        }
    },
    methods:{
        ModalHelper: () =>{
            // ('dialog-open')
            let bodyCls = 'dialog-open'
            let scrollTop;
            return {
                afterOpen: function () {
                    scrollTop = document.scrollingElement.scrollTop; 
                    document.body.classList.add(bodyCls);
                    document.body.style.top = -scrollTop + 'px';
                },
                beforeClose: function () {
                    document.body.classList.remove(bodyCls);
                }
            };
        },
        setIconType (v, icon) {
            if (v == "") {
                this[icon] = "error"
            } else {
                this[icon] = "success"
            }
        },
        submit: Debounce(function () {
            //需求保存接口  
            const _this = this;
            if (this.enterpriseName == "") {
                this.orgnameIcon = "error"
                return
            }
            if (this.location == "") {
                this.locationIcon = "error"
                return
            }
            if (this.name == "") {
                this.nameIcon = "error"
                return
            }
            if (this.phone == "") {
                this.phoneIcon = "error"
                this.toastType = "text"
                return
            }
            axios.post('/yuncai-yop/contribute/save', {
                enterpriseName: this.enterpriseName,
                name: this.name,
                phone: this.phone,
                location: this.location,
                details: this.materialist,
                systemId: this.systemId,
                type:this.type
            }).then(function (res) {
                _this.isToast = true
                _this.toastMsg = "提交成功,信息需经平台审核通过后方可公布出来"
                _this.toastType = "success"
                Bus.$emit("close-modal",!_this.showmodal)
            }).catch((function (err) {
                _this.isToast = true
                _this.toastMsg = "提交失败"
                _this.toastType = "warn"
            }))
        }, 3000),
        close () {
            Bus.$emit("close-modal",!this.showmodal)
        },
        toastHide () {
            if (this.toastType !== "text") {
                this.enterpriseName = ''
                this.name = ''
                this.phone = ''
                this.location = ''
                this.materialist = [{materialClassName:'',materialNum:'',materialDesc:''}]
            }
        },
        addmaterial (){
            this.materialist.push({materialClassName:'',materialNum:'',materialDesc:''})
        },
        del (index){
            this.materialist.splice(index,1)
            console.log(this.materialist)
        }
    },
    mounted () {
        var tag = window.location.search.split('=')[1]
        if(tag && tag.includes('hzh')){
        //北京商务联全球供需平台
        this.systemId = 1
        }else{
        //友云采短缺物资线索征集
        this.systemId = 0
        }

        switch(this.type){
            case 4:
            this.originatorNameText = '募捐人信息'
            this.materialNameText = '募捐物资信息'
            this.entNameText = '供应商'
            break;  
            case 6:
            this.originatorNameText = '捐赠人信息'
            this.materialNameText = '捐赠物资信息'
            this.entNameText = '募捐方'
            break;  
            case 8:
            this.originatorNameText = '供货人信息'
            this.materialNameText = '供应物资信息'
            this.entNameText = '需求方'
            break;
            case 10:
            this.originatorNameText = '需求人信息'
            this.materialNameText = '需求物资信息'
            this.entNameText = '供应商'
            break;   
        }
    }
}
</script>
<style>
.i-feedback .form-input {
    padding-left: 15px;
}
.disclaimer-mask {
    overflow-y: scroll;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    z-index: 5001;
    background: #fff;
    -webkit-overflow-scrolling: touch;
}   
.addMaterial{
    text-align: center;
    margin-top: 10px;
    color:#4567FA;
    font-size:16px;
    height: 32px;
    line-height: 32px;
}
.weui-mask_transparent{
    z-index:6000;
}
.weui-label{
    width: 50px!important;
}
</style>