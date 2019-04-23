<template>
  <div class="regit">
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      loginform: {
        name: '',
        password: ''
      },
      nameError: '',
      passWordError: '',
      passsave: false
    }
  },
  methods: {
    logining () {
      const userflag = this.userNameBlur()
      const passflag = this.passWordBlur()
      if (userflag && passflag) {
        Cookies.set('food_isLogin', '1')
        Cookies.set('food_user', this.loginform.name)
        this.$router.push({
          path: '/'
        })
      }
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
      if (!reg.test(this.loginform.name)) {
        this.nameError = '请输入6-18位英文字母，数字组合'
        return false
      }
      this.nameError = ''
      return true
    },
    passWordBlur() {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (this.loginform.password === '') {
        this.passWordError = '请输入登陆密码'
        return false
      }
      if (!reg.test(this.loginform.password)) {
        this.passWordError = '请输入6-18位英文字母，数字组合'
        return false
      }
      this.passWordError = ''
      return true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/reg.less';
</style>