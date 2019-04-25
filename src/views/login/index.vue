<template>
  <div class="login">
    <div class="weblogo">
      <img src="../../assets/img/icon.png" alt="">
      <span>食安物链</span>
    </div>
    <div class="bottom_container">
      <span class="xian"></span>
      <span>copyright &#169 2019 食安物链 All rights Reserved</span>
      <span class="xian xian-right"></span>
    </div>
    <div class="login-box">
      <el-row>
        <el-col :span="12">
          <div class="box-left">
            <img src="../../assets/img/loginicon.png" alt="">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box-right">
            <h2>食安物链后台管理系统</h2>
            <div class="loginForm">
              <div class="form-item" :class="{formItemError : nameError!==''}">
                <i class="user-icon"></i>
                <input class="username" @blur="userNameBlur" v-model="loginform.name" placeholder="请输入登陆账号" type="text">
                <span class="error">{{nameError}}</span>
              </div>
            </div>
            <div class="loginForm">
              <div class="form-item" :class="{formItemError : passWordError!==''}">
                <i class="user-icon pass-icon"></i>
                <input class="username" @blur="passWordBlur" v-model="loginform.password" placeholder="请输入登陆密码" type="password">
                <span class="error">{{passWordError}}</span>
              </div>
            </div>
            <div class="loginForm loginCode">
              <div class="form-item" :class="{formItemError : codeError!==''}">
                <i class="user-icon code-icon"></i>
                <input class="username" @blur="codeBlur" v-model="loginform.code" placeholder="验证码计算结果" type="text">
                <span class="error">{{codeError}}</span>
                <img :src="identifyImg" class="codeImg" @click="getCode"/>
                <span class="changeImg" @click="getCode">
                  换一张
                </span>
              </div>
            </div>
            <div class="loginForm">
              <div class="form-item form-item-last">
                <i @click="savePass" class="user-icon passsave-icon" :class="{passsaved : passsave}"></i>
                <span>记住密码</span>
              </div>
            </div>
             <div class="loginForm">
              <span @click="logining" class="loginBtn">登陆</span>
            </div>
            <div>
              <span @click="reging" class="reging">没有账号,请<span>立即注册</span></span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import api from '@/feath/api.js'
export default {
  data () {
    return {
      loginform: {
        name: '',
        password: '',
        code: ''
      },
      nameError: '',
      passWordError: '',
      codeError: '',
      passsave: false,
      identifyImg: '../../assets/img/loginicon.png',
      logintoken: ''
    }
  },
  created () {
    
  },
  mounted () {
    this.getCode()
  },
  methods: {
    logining () {
      const _this = this;
      if (this.loginform.name == '') {
        this.userNameBlur();
        return false;
      } else if (this.loginform.password == '') {
        this.passWordBlur();
        return false;
      } else if (this.loginform.code == ''){
        this.codeBlur();
        return false;
      }
      let data = {
        userName: this.loginform.name,
        password: this.loginform.password,
        verifyCode: this.loginform.code
      }
      api.login(data).then(res => {
        if (res.code == 0) {
          if (res.result.token) {
            const roleMap = {
              '超级管理员': '管理员',
              '操作员': '管理员',//--此系统无效
              '运营者': '管理员',//--此系统无效角色
              '管理员': '操作员',
            }
            let roleName = roleMap[res.result.user.roleName]
            let oUrl = '/'
            const organId = res.result.user.organId;

            Cookies.set('food_isLogin', '1')
            Cookies.set('food_user', res.result.user.userName)
            localStorage.setItem('food_roleName',roleName)
            localStorage.setItem('food_roleNameOrigin',res.result.user.roleName)
            localStorage.setItem('access_token',res.result.token)
            localStorage.setItem('u_organId',organId)

            if (roleName == '操作员') {
              oUrl = '/'
              api.getOrgStatus({
                "organId": organId
              }).then(res => {
                if (res.code == 0) {
                  if(res.result.approvalStatus===3){
                    oUrl = '/overview'
                  }else{
                    oUrl = '/unaudited'
                    //企业未审核通过
                    localStorage.setItem('food_roleName','运营者')
                  }

                  _this.$router.push({
                    path: oUrl
                  })
                }
              });
            }else{
              oUrl = '/';
              this.$router.push({
                path: oUrl
              })
            }
            
            
          }
        } else {
          this.$message.error(res.msg);
        }
       
      })
    },
    reging(){
      this.$router.push({
          path: '/register'
        })
    },
    savePass () {
      this.passsave = ! this.passsave
    },
    userNameBlur() {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (this.loginform.name === '') {
        this.nameError = '请输入登陆账号'
        return false
      }
      // if (!reg.test(this.loginform.name)) {
      //   this.nameError = '请输入6-18位英文字母，数字组合'
      //   return false
      // }
      this.nameError = ''
      return true
    },
    passWordBlur() {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (this.loginform.password === '') {
        this.passWordError = '请输入登陆密码'
        return false
      }
      // if (!reg.test(this.loginform.password)) {
      //   this.passWordError = '请输入6-18位英文字母，数字组合'
      //   return false
      // }
      this.passWordError = ''
      return true
    },
    codeBlur () {
      if (this.loginform.code === '') {
        this.codeError = '验证码不能为空'
        return false
      }
      this.codeError = ''
      return true
    },
    getCode () {
      const data = {
        'verifyCode-authentic-request-header': new Date().getTime()
      }
      api.getVerify(data).then(res => {
        const token = new Date().getTime();
        localStorage.setItem('verifyCodeToken',token)
        this.identifyImg = localStorage.getItem('domain') + '/userBack/getVerify?verifyCode-authentic-request-header=' + token;
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/login.less';
</style>