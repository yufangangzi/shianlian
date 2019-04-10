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
              <div class="form-item">
                <i class="user-icon"></i>
                <input class="username" placeholder="请输入登陆账号" type="text">
              </div>
            </div>
            <div class="loginForm">
              <div class="form-item">
                <i class="user-icon pass-icon"></i>
                <input class="username" placeholder="请输入登陆密码" type="text">
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
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      loginform: {
        name: ''
      },
      passsave: false
    }
  },
  methods: {
    logining () {
      Cookies.set('food_isLogin', '1')
      this.$router.push({
        path: '/'
      })
    },
    savePass () {
      this.passsave = ! this.passsave
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/login.less';
</style>