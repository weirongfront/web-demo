<template>
    <div class="login-container" @keyup.enter.native="handleLogin">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <div class="title-wrap">
                    <img src="@imgs/login_logo.svg"/>
                    <span>反手猴云后台管理平台</span>
                </div>
            </div>
            <div class="content-container">
                <el-form-item prop="username" :class="{'input-focus':userfocus}">
                    <span class="svg-container">
                        <svg-icon icon-class="account"/>
                    </span>
                    <el-input ref="username" v-model="loginForm.account" placeholder="请输入您的账号" maxlength="19" name="account" type="text" tabindex="1" autocomplete="on"/>
                </el-form-item>
                <el-tooltip v-model="capsTooltip" content="键盘大写已打开" placement="right" manual>
                    <el-form-item prop="password" :class="{'input-focus':pwdfocus}">
                        <span class="svg-container">
                            <svg-icon icon-class="password"/>
                        </span>
                        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" maxlength="20" placeholder="请输入您的密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false"/>
                        <span class="show-pwd" @click="showPwd">
                            <svg-icon icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                        </span>
                    </el-form-item>
                </el-tooltip>
                <div class="clearfix">
                    <el-form-item prop="verifi" class="fl verifi">
                        <span class="svg-container">
                            <svg-icon icon-class="verification-code"/>
                        </span>
                        <el-input maxlength="4" ref="verifi" v-model="loginForm.captcha" placeholder="请输入验证码" name="captcha" type="text" tabindex="3"/>
                    </el-form-item>
                    <img class="verifi-img" @click="changeVerifi($event)" :src="getVerfiSrc" title="看不清？点击换一张"/>
                </div>
                <el-button class="big-btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import {login} from '@data/user';
import {baseUrl} from '@/config';
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'login',
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        const validateVerifi = (rule, value, callback) => {
            if (value.length < 4) {
                callback(new Error('请输入验证码'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                account: '',
                password: '',
                captcha:''
            },
            loginRules: {
                account: [
                    {required: true, trigger: 'blur', message:'请输入您的账号'},
                    { min: 6, max: 19, message: '长度在 6 到 19 个字符', trigger: 'blur' }],
                password: [{required: true, trigger: 'blur', validator: validatePassword}],
                captcha: [{required: true, trigger: 'blur', validator: validateVerifi}]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
            userfocus:false,
            pwdfocus:false
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true
        }
    },
    created() {
        let _that = this;
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                _that.handleLogin();
            }
        }
    },
    mounted() {
        if (this.loginForm.account === '') {
            this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus()
        }else if(this.loginForm.captcha === ''){
            this.$refs.verifi.focus();
        }
    },
    computed:{
        ...mapGetters('user',['token']),
        getVerfiSrc(){
            return this.getVerfiSrcMethod();
        }
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        ...mapActions('user',['setToken']),
        getVerfiSrcMethod(){
            return baseUrl + 'createImg?token=' + this.token+'&_'+(+new Date());
        },
        changeVerifi(event){
            event.target.src = this.getVerfiSrcMethod();
        },
        checkCapslock({shiftKey, key} = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true
                } else {
                    this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    login(this.loginForm).then((res) => {
                        this.loading = false;
                        this.setToken(res);
                        let redirect = (this.redirect === '/login' || !this.redirect)?'/inlet':this.redirect;
                        this.$router.push({ path: redirect, query: this.otherQuery })
                    }).catch(() => {
                        this.loading = false;
                    })
                } else {
                    return false
                }
            })
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }
    }
}
</script>

<style lang="scss">
    $bg: #fff;
    $light_gray: #fff;
    /* reset element-ui css */
    .login-container {
        .el-form-item__content{font-size: $font-f4-size;}
        .verifi{
            .el-input{width: 140px;}
        }
        .el-input {
            display: inline-block;
            height: 45px;
            width: 84%;
            input {
                @extend %fsh-input;
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0;
                padding: 0 5px 0 15px;
                height: 43px;
                line-height: 43px;
                &:-webkit-autofill {
                    -webkit-text-fill-color: $font-black-color !important;
                }
            }
        }
        .el-form-item {
            @extend %fsh-input;
            // margin-bottom: 30px;
            height: 45px;
        }
        .el-form-item__error{
            color:$red;
            font-size: $font-f5-size;
            margin-top: -2px;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .verifi{width: 190px;}
    .verifi-img{float: left;display: block;width: 100px;height: 43px;margin-left: 10px;cursor: pointer;}
    .input-focus{border-color: $blue-click;}
    .big-btn{height: 45px;
    //  margin-bottom: 30px;margin-top: 10px;
     }
    .login-container {
        background: url("~@imgs/login/login-background.png") no-repeat;
        background-size: 100%;
        text-align: center;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .login-form {
            position: absolute;
            width: 400px;
            height:365px;
            overflow: hidden;
            top:50%;
            right:160px;
            margin-top: -200px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 7px 0 rgba(0,0,0,.2);
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 0px 5px 5px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 40px;
            font-size: 18px;
            display: inline-block;
        }

        .title-container {
            position: relative;
            height:60px;
            background: url("~@imgs/login/logins_limage.png") 0 0 / 100% 100% no-repeat;
            .title-wrap{
                position: absolute;
                width: 240px;
                left: 50%;
                margin-left: -115px;
                margin-top: 10px;
                line-height: 40px;
                img{
                    width: 40px;
                }
                span{
                    display: inline-block;
                    color: #fff;
                    font-size: 22px;
                    vertical-align: top;
                    margin-left: 5px;
                }
            }
        }
        .content-container{
            width: 100%;
            margin: 0 auto;
            padding: 30px 50px;
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 2px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
            z-index: 99999;
        }
    }
</style>
