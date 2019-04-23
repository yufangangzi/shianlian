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
  
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/reg.less';
</style>