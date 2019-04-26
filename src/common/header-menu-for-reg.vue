<template>
  <div class="headtab">
    <div class="title-icon">
      <img src="../assets/img/icon.png" alt="">
    </div>
    <div class="title">食安物链管理后台</div>
    
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      userName: Cookies.get('food_user') || 'admin'
    }
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/header.less";
</style>