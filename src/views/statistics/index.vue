<template>
  <div class="statistics">
    <div>统计报表</div>
    <div>
      <el-row class="left">
        <el-col :span="24">
          <!-- <h5>自定义颜色</h5> -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            text-color="#000"
            active-text-color="#ffd04b">
            <el-menu-item index="1"  >
              <div slot="title">
                <div class="tit">总调用量</div>
                <div> <span>2568</span> <span>同比</span> <span>+12.7%</span></div>
              </div>
            </el-menu-item>
            <el-menu-item index="2"  >
              <span slot="title">数据上传</span>
            </el-menu-item>
            <el-menu-item index="3"  >
              <span slot="title">数据查询</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/css/statistics.less';
</style>