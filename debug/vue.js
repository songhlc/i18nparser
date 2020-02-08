import { init } from '../packages/vue/index'
var input = `<template>
    <div>
        <div v-transfer-dom>
        <x-dialog
            :dialog-style="{'max-width': '100%', width: '95%', 'background-color': '#FFF'}"
            hide-on-blur
            :scroll="false"
            v-model="showmodal"
        >
            <div>
            <disclaimer></disclaimer>
            <div class="i-feedback" style="text-align:left">
                <p class="red" style="padding: 10px 9px 0 9px;text-align: left;">
                    <slot name="documents">
                        如果您在疫情防控工作中，存在防护物资的短缺情况，请按照
                        以下格式真实反馈，我们将全力助您查寻对应供货渠道(请真实填写)
                    </slot>
                </p>
                <div class="form" style="margin-top:10px">
                <div class="form-title1">个人信息</div>
                <group title="我的真实姓名：" class="form-group">
                    <x-input
                    v-model="name"
                    type="text"
                    is-type="china-name"
                    @on-change="setIconType(name,'nameIcon')"
                    :icon-type="nameIcon"
                    placeholder="请输入真实姓名"
                    class="form-input"
                    novalidate
                    :show-clear="false"
                    ></x-input>
                </group>
                <group title="企业名称：" class="form-group">
                    <x-input
                    v-model="location"
                    placeholder="请输入企业名称"
                    class="form-input"
                    @on-change="setIconType(location,'locationIcon')"
                    :icon-type="locationIcon"
                    novalidate
                    :show-clear="false"
                    ></x-input>
                </group>
                <group title="联系电话：" class="form-group">
                    <x-input
                    v-model="phone"
                    placeholder="请输入真实联系电话"
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
                <div class="form-title1">{{info||'短缺物资信息'}}</div>
                <group title class="form-group no-title">
                    <x-textarea
                    :max="400"
                    :placeholder="infoPlaceHolder||'请填写物资名称及数量，详细的规格型号或其他补充说明（最多可输入400字）'"
                    v-model="materialDes"
                    required
                    class="form-input textarea-bg"
                    ></x-textarea>
                </group>
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
        </x-dialog>
        </div>
        <toast v-model="isToast" @on-hide="toastHide" :text="toastMsg" :type="toastType"></toast>
    </div>
</template>
<script>
import axios from 'axios'
import { TransferDomDirective as TransferDom, XDialog, Group, XInput, XTextarea, XButton, Flexbox, FlexboxItem, Toast } from 'vux'
import { Debounce } from '../utils'
import Disclaimer from './Disclaimer'
export default {
    name:'AddSubmit',
     directives: {
        TransferDom
    },
    components:{
        TransferDom, XDialog, Group, XInput, XTextarea, XButton, Flexbox, FlexboxItem,Toast,
        Disclaimer
    },
    props:['showmodal','infoPlaceHolder','info'],
    data(){
        return {
            name:'',
            nameIcon:'',
            location:'',
            locationIcon:'',
            phone:'',
            phoneIcon:'',
            materialDes:'',
            isToast: false,
            toastMsg: '提交成功',
            toastType: 'success',
        }
    },
    methods:{
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
            if (this.name == "") {
                this.nameIcon = "error"
                return
            }
            if (this.location == "") {
                this.locationIcon = "error"
                return
            }
            if (this.phone == "") {
                this.phoneIcon = "error"
                return
            }
            if (this.materialDes == "") {
                this.isToast = true
                this.toastMsg = "物资信息必填"
                this.toastType = "text"
                return
            }

            axios.post('/yuncai-yop/contribute/save', {
                name: this.name,
                phone: this.phone,
                location: this.location,
                materialDes: this.materialDes
            }).then(function (res) {
                _this.isToast = true
                _this.toastMsg = "提交成功,物资信息需经平台审核通过后方可公布出来"
                _this.toastType = "success"
                console.log(res)
            }).catch((function (err) {
                console.log(err)
                _this.isToast = true
                _this.toastMsg = "提交失败"
                _this.toastType = "warn"
            }))
        }, 3000),
        close () {
            this.$emit("changeShowModal",false)
        },
        toastHide () {
            if (this.toastType !== "text") {
                this.name = ''
                this.phone = ''
                this.location = ''
                this.materialDes = ''
            }
        },
    }
}
</script>
<style>

</style>`;
var result = init(input)
console.log(result)

