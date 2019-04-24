<template>
  <el-dialog title="提示" :visible.sync="refuseVisible" width="600px" :before-close="handleClose">
    <div class="refuseBox">
      <div class="refuseTop"><i class="el-icon-error"></i></div>
      <h3 class="refuseTitle">拒绝申请</h3>
      <p class="refuseCt">
        点击确认拒绝该企业的上链申请，该企业本次申请将无效。该企业可重新发起申请加入业务链。
      </p>
      <div class="reason">
        <h3><span>*</span>拒绝原因</h3>
        <el-input
          type="textarea"
          :rows="4"
          maxlength="140"
          @change="onChange"
          placeholder="请填写拒绝原因，最多140字"
          v-model="textarea">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseCancel" class="Cancel">取 消</el-button>
        <el-button type="primary" @click="refuseOk(textarea)">确 认</el-button>
      </span>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props:{
      refuseVisible: {
        type: Boolean,
        default: false
      },
      refuseCancel: {
        type: Function
      },
      refuseOk: {
        type: Function
      },
    },
    data() {
      return {
        textarea: ''
      };
    },
    created () {
      this.textarea = ''
    },
    methods: {
      handleClose(done) {
       this.refuseCancel()
      },
      onChange (val) {
        console.log(val)
        this.textarea = val;
      }
    }
  };
</script>
<style scoped>
.refuseBox{
  padding: 0px 20px;
}
.refuseTop{
  text-align: center;
  margin-bottom: 14px;
}
.refuseTitle{
  text-align: center;
  font-size: 16px;
  margin-bottom: 8px;
  color: #514C4A;
  font-weight: normal;
}
.refuseCt{
  font-size: 12px;
  color: #898989;
}
.reason h3{
  font-size: 14px;
  margin-top: 34px;
  margin-bottom: 14px;
}
.reason h3 span{
  color: #FA4141;
}
.refuseBox .el-icon-error{
  font-size: 40px;
  color: #fa4141;
  text-align: center;
}
.dialog-footer{
  display: flex;
  justify-content: center;
}
.dialog-footer .el-button{
  margin-top: 35px;
  width: 78px;
}
.dialog-footer .Cancel{
  margin-right: 100px;
}
</style>
