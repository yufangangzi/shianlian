<template>
  <el-dialog title="提示" :visible.sync="adoptVisible" width="400px" :before-close="handleClose">
    <div class="adoptBox">
      <i class="el-icon-circle-check"></i>
      <h3 class="adoptTitle">通过审核</h3>
      <p class="adoptCt">
        您已经通过该企业的加入食安物链申请，该企业现已上链。
      </p>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="adoptCancel">取 消</el-button> -->
        <el-button type="primary" @click="adoptOk">确 认</el-button>
      </span>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props:{
      adoptVisible: {
        type: Boolean,
        default: true
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
  margin-top: 14px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #514C4A;
  font-weight: normal;
}
.adoptBox{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.adoptBox .el-icon-circle-check{
  font-size: 40px;
  color: #19C162;
}
.adoptCt{
  font-size: 12px;
  color: #898989;
  margin-bottom: 35px;
}
</style>
