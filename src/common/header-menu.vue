<template>
  <div class="headtab">
    <div class="title-icon">
      <img src="../assets/img/icon.png" alt="">
    </div>
    <div class="title">食安物链管理后台</div>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/img/user.png" alt="头像" style="width: 30px; margin-left: 10px; height: 30px; vertical-align: middle;">
          <span class="username">admin</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSelect () {

    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/header.less";
</style>