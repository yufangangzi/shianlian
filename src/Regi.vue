<template>
  <div id="reg">
    <el-container>
      <el-header>
        <header-menu></header-menu>
      </el-header>
      <el-container>
        <reg></reg>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import reg from './views/reg/index.vue'
import HeaderMenu from './common/header-menu-for-reg.vue'
export default {
  data() {
    return {
      
    }
  },
  components: {
    reg,
    HeaderMenu
  }
}
</script>
