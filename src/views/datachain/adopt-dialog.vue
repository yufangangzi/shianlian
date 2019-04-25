<template>
  <el-dialog title="提示" :visible.sync="adoptVisible" width="500px" :before-close="handleClose">
    <h3 class="adoptTitle">通过审核！</h3>
    <p class="adoptCt">
      您已经通过该企业的加入食安物链申请，该企业现已上链。
    </p>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="adoptCancel">取 消</el-button> -->
      <el-button type="primary" @click="adoptOk">确 认</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    props:{
      adoptVisible: {
        type: Boolean,
        default: false
      },
      adoptOk: {
        type: Function
      },
    },
    data() {
      return {
      };
    },
    methods: {
      handleClose(done) {
       this.adoptOk()
      }
    }
  };
</script>
<style scoped>
.adoptTitle{
  text-align: center;
  margin-bottom: 20px;
}
.adoptCt{
  text-align: center;
}
</style>
