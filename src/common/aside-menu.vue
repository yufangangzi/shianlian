<template>
  <el-row class="tac">
  <el-col :span="24">
    <!-- <h5>自定义颜色</h5> -->
    <el-menu
      :default-active="pathfull || asideList[0].path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      text-color="#fff"
      active-text-color="#fff">
      <el-menu-item v-for="(item,index) in asideList" :index="item.path" :key="index" :disabled="item.disabled" v-if="item.show">
        <i class="icon" :class="item.iconclass"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>
<script>
  import {aside} from '@/router/index.js'
  import api from '@/feath/api.js'
  export default {
    data () {
      return {
        asideList: aside,
        pathfull: ''
      }
    },
    watch:{
      $route (val) {
        this.pathfull = val.path
        console.log(val)
      },

    },
    mounted() {
      this.pathfull = this.$route.path;
      const _this = this;
      this.$bus.on('refresh-role', this.menus);
      // 企业审核通过后刷新menu菜单
      
      if('运营者' == localStorage.getItem('food_roleName')){
        this.getStatusList(_this.menus)
      }else{
        setTimeout(()=>{
          this.menus()
        },1);
      }
    },
    methods: {
      getStatusList (callback) {
        api.getOrgStatus({
          "organId": localStorage.getItem('u_organId')
        }).then(res => {
          if (res.code == 0) {
            if (!res.result) {
              // 企业审核通过跳转页面
              localStorage.setItem('food_roleName','操作员')
            }
              
            callback();
           
          }
        });
      },
      select (key) {
        this.$router.push({
          path: key
        })
        console.log(key);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menus () {
        // 在此处更改左侧显隐
        // console.log(this.asideList);
        // this.asideList[1].disabled = true;

        // 从登录接口取出的权限 超管 企业 企业2：代表审核未通过的
        // const levelName = '超管';
        // const levelName = '企业';
        // 从登录接口取出的权限 管理员 操作员 运营者：代表审核未通过的
        const levelName = localStorage.getItem('food_roleName');
        // const levelName = '企业';
        // const levelName = '企业2';
        // debugger
        this.asideList = this.asideList.map((v) => {
          v.show = v.meta.belongList.indexOf(levelName)>-1;
          return v;
        })
      }
    }
  }
</script>
<style lang="less" scoped>
@import "../assets/css/asidemenu.less";
</style>