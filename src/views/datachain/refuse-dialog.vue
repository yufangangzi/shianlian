<template>
  <el-dialog title="提示" :visible.sync="refuseVisible" width="500px" :before-close="handleClose">
    <h3 class="refuseTitle">拒绝申请</h3>
    <p>
      点击确认拒绝该企业的上链申请，该企业本次申请将无效。该企业可重新发起申请加入业务链。
    </p>
    <div class="reason">
      <h3>拒绝原因</h3>
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
      <el-button @click="refuseCancel">取 消</el-button>
      <el-button type="primary" @click="refuseOk(textarea)">确 认</el-button>
    </span>
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
.refuseTitle{
  text-align: center;
  margin-bottom: 20px;
}
.reason h3{
  font-size: 12px;
  margin: 20px 0px; 
}
</style>
