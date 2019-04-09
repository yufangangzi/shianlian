<template>
  <div class="account">
    <div>
      账户管理
      <el-button @click="adduser" type="primary">新建用户</el-button>
    </div>
    <div>
      <span>角色名称：</span>
      <el-select v-model="rulevalue" placeholder="请选择角色">
        <el-option
          v-for="item in rules"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>用户状态：</span>
      <el-select v-model="typevalue" placeholder="请选择状态">
        <el-option
          v-for="item in rules"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户ID"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="rulename"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="scope">
            <el-button  type="text" size="small" style="color:#000">编辑</el-button>
            <el-button @click="resetpasword(scope.row)" type="text" size="small">重置密码</el-button>
            <el-button @click="enable(scope.row)" type="text" size="small">启用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        style="text-align: center"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择用户角色">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline:center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="passwordreset" width="500px">
      <el-form :model="resetForm">
        <el-form-item label="设置新密码" :label-width="formLabelWidth">
          <el-input v-model="resetForm.oldpassword" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
        <el-form-item label="确定新密码" :label-width="formLabelWidth">
          <el-input v-model="resetForm.newpassword" autocomplete="off" placeholder="6-18位英文字母，数字组合"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline:center">
        <el-button @click="passwordreset = false">取 消</el-button>
        <el-button type="primary" @click="passwordreset = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      rules: [

      ],
      rulevalue: '',
      typevalue: '',
      tableData: [
        {
          id: '344rrr',
          name: 'ganggang',
          rulename: '王刚',
          type: '启用'
        }
      ],
      currentPage: 0,
      dialogFormVisible: false,
      form: {
        name: '',
        rule: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      passwordreset: false,
      resetForm: {
        oldpassword: '',
        newpassword: ''
      }
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    adduser () {
      this.dialogFormVisible = true
    },
    resetpasword (val) {
      this.passwordreset = true
      console.log(val)
    },
    enable () {
      const h = this.$createElement;
      this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '禁用后该用户将无法登陆'),
            // h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/account.less';
</style>