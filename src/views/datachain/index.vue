<template>
  <div class="account">
    <div class="tit">
      数据上链
    </div>
    <div class="select-box">
      <!-- <span class="sel-lab sel-lab-first">数据筛选：</span>
      <el-select v-model="rulevalue" placeholder="全部">
        <el-option
          v-for="item in rules"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <span class="sel-lab" v-show="false">用户状态：</span>
      <el-select v-model="typevalue" placeholder="请选择状态" v-show="false">
        <el-option
          v-for="item in statuslist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="inputValue" placeholder="请输入交易ID或标题" style="max-width:217px;margin-left:30px;"></el-input>
      <el-button type="primary" class="cha-btn" @click="getListby">查询</el-button>
      <el-button class="reset-btn" @click="resetList">重置</el-button>
    </div>
    <div class="add-btn">
      <el-button @click="createChain" type="primary" icon="el-icon-plus" size="medium">新建数据</el-button>
    </div>
    <div class="cc-box">
      <div class="">
        <div class="tli"></div>
        <div class="tit">数据上链</div>
      </div>
    <div class="table-box">
      <el-table
        border
        :data="tableData"
        header-row-class-name="biao-head"
        :header-cell-style="biaostyle"
        :cell-style="cellStyle"
        
        style="width: 100%">
        <!-- <el-table-column
          type="index"
          align="center"
          width="80"
          >
        </el-table-column> -->
        <el-table-column
          prop="tradingId"
          label="交易ID"
          align="center"
          
          >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          width="180"
          >
        </el-table-column>
        <el-table-column
          prop="updateTime2"
          align="center"
          label="更新时间"
          width="180"
          >
        </el-table-column>
        <el-table-column
          prop="chainStatusText"
          align="center"
          label="状态"
          width="80"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          >
          <template slot-scope="scope">
            <el-button v-if="scope.row.chainStatus==4 || scope.row.chainStatus==3" @click="editChain(scope.row)"  type="text" size="small" style="color:#0087ED;font-size:14px">编辑</el-button>
            <el-button v-if="scope.row.chainStatus==4 || scope.row.chainStatus==3" @click="upChain(scope.row)" type="text" size="small" style="color:#0087ED;font-size:14px">上链</el-button>
            <el-button v-if="scope.row.chainStatus==4 || scope.row.chainStatus==3" disabled type="text" size="small" style="font-size:14px">下载溯源码</el-button>
            <el-button v-if="scope.row.chainStatus==1" @click="viewChain(scope.row)"  type="text" size="small" style="color:#0087ED;font-size:14px">查看</el-button>
            <el-button v-if="scope.row.chainStatus==1" disabled type="text" size="small" style="font-size:14px">上链</el-button>
            <el-button v-if="scope.row.chainStatus==1" @click="downQR(scope.row)" type="text" size="small" style="color:#0087ED;font-size:14px">下载溯源码</el-button>
            <el-button v-if="scope.row.chainStatus==2" disabled  type="text" size="small" style="font-size:14px">查看</el-button>
            <el-button v-if="scope.row.chainStatus==2" disabled type="text" size="small" style="font-size:14px">上链</el-button>
            <el-button v-if="scope.row.chainStatus==2" disabled type="text" size="small" style="font-size:14px">下载溯源码</el-button>
            <!-- <el-button @click="resetpasword(scope.row)" type="text" size="small" style="color:#0087ED;font-size:14px">重置密码</el-button>
            <el-button @click="enable(scope.row)" type="text" size="small" :style="scope.row.status===0 ? status1: status0 ">{{scope.row.status === 0 ? '禁用' : '启用'}}</el-button>
            <el-button @click="deleteuser(scope.row)" type="text" size="small" style="color:#0087ED;font-size:14px">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total,prev, pager, next,sizes,jumper"
        :page-size="totalPageSize"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
        style="text-align: center"
        @current-change="gotoPage"
        :current-page="currentPageNum"
        :total="listNum">
      </el-pagination>
    </div>
    </div>
    
  </div>
  
</template>
<script>
import api from '@/feath/api.js'
import {timeformat} from '@/util/filter.js'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback('请输入6-18位英文字母，数字组合');
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback('请输入6-18位英文字母，数字组合');
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        callback('请输入6-18位英文字母，数字组合');
      }else if (value !== this.resetForm.oldpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      addformRules: {
        userName: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validateUser, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validatePass, trigger: 'blur' }
        ],
        roleName: [
          {required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      },
      passwordRules: {
        oldpassword: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validatePass, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请再次输入密码', trigger: 'blur' },
          {validator: validatePass2, trigger: 'blur' }
        ]
      },
      biaostyle: {
        backgroundColor: '#F6F7FB',
        fontSize: '14px',
        color: '#333',
        fontWeight: '400'
      },
      status0: {
        color: '#64B523',
        fontSize: '14px'
      },
      status1: {
        color: '#FA453C',
        fontSize: '14px'
      },
      listNum: 0,
      rules: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '产地链',
          label: '产地链'
        },
        {
          value: '加工链',
          label: '加工链'
        },
        {
          value: '物流链',
          label: '物流链'
        }
      ],
      statuslist: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ],
      rulevalue: '全部',
      typevalue: '',
      inputValue: '',
      tableData: [
        
      ],
      currentPage: 0,
      dialogFormVisible: false,
      form: {
        userName: '',
        password: '',
        roleName: '',
      },
      formLabelWidth: '120px',
      passwordreset: false,
      resetForm: {
        oldpassword: '',
        password: '',
        id: ''
      },
      editformVisble: false,
      editForm: {
        userName: '',
        roleName: '',
        id: ''
      },
      currentPageNum: 1,
      totalPageSize: 10
    }
  },
  mounted() {
    this.getList()
  },
  created () {
    
  },
  methods: {
    cellStyle (row, column, rowIndex, columnIndex) {
      // if (row.columnIndex === 3 || row.columnIndex === 4) {
      //   if (row.row.status === 0) {
      //     return {
      //       color: '#64B523',
      //     }
      //   } else {
      //     return {
      //       color: '#FA453C',
      //     }
      //   }
      // }
    },
    getList () {
      const data = {
        pageNum: this.currentPageNum,
        // pageSize: this.totalPageSize,
        // roleName: this.rulevalue,
        // status: this.typevalue
        title: this.inputValue
      }
      api.dataChainList(data).then(res => {
        // debugger
        if (res.code ===0) {
          res.result.list = res.result.list || [];
          res.result.list.forEach(item => {
            if (item.chainStatus === 4) {
              item.chainStatusText = '新建'
            } else if (item.chainStatus === 1) {
              item.chainStatusText = '已上链'
            } else if (item.chainStatus === 2) {
              item.chainStatusText = '上链中'
            } else if (item.chainStatus === 3) {
              item.chainStatusText = '上链失败'
            }
            // debugger;
            try{
              if(item.updateTime){
                item.updateTime2 = timeformat(new Date(item.updateTime));
              }else{
                item.updateTime2 = ''
              }
            }catch(e){
              item.updateTime2 = '';
            }
          })
          this.listNum = res.result.total
          this.tableData = res.result.list
        }
      })
    },
    handleSizeChange(val) {
      console.log(val)
      this.totalPageSize = val
      this.getList()
    },
    getListby () {
      this.currentPageNum = 1
      this.getList()
    },
    gotoPage (currentPage) {
      this.currentPageNum = currentPage
      this.getList()
    },
    resetList () {
      this.rulevalue = '';
      this.typevalue = '';
      this.inputValue = '';
      this.getList()
    },
    adduser () {
      this.dialogFormVisible = true
    },
    initAddUser () {
      this.dialogFormVisible = false
      this.form = {
        userName: '',
        password: '',
        roleName: '',
      }
    },
    adduserCancel () {
      this.initAddUser()
      this.$refs.form.resetFields()
    },
    createChain () {
      this.$router.push('/datachainDetails?type=1')
    },
    editChain (val) {
      console.log(val)
      this.$router.push('/datachainDetails?id=' + val.id+'&type=1')
    },
    viewChain (val) {
      console.log(val)
      this.$router.push('/datachainDetails?id=' + val.id+'&type=2')
    },
    
    passwordResetCancel (val) {
      this.passwordreset = false
      this.resetForm.password = ""
      this.resetForm.oldpassword = ''
      this.$refs.resetForm.resetFields()
    },
    //下载溯源码
    downQR (row) {
      console.log(row);
      document.getElementById("qrcode").innerHTML = '';
      var qrcode = new QRCode(document.getElementById("qrcode"), `https://tiot.sinochem-tech.com/shianlian/sy/${row.id}`);

      var fileName = `imgqrcode_${row.id}.png`;
      var canvas = document.querySelector('#qrcode canvas');
      canvas.toBlob(function(blob) {
        // debugger;
          saveAs(blob, fileName);
      });
      
    },
    upChain (row) {
      let index = 0;
      this.tableData.forEach((it, i) => {
        if(it.id === row.id){
          index = i;
          // debugger;
        }
      })
      this.tableData[index].chainStatus = 2;
      this.tableData[index].chainStatusText = '上链中';
      const data = {
        id: row.id,
      }
      api.dataChainOn(data).then(res => {
        if (res.code === 0) {
          if(res.result===1){
            this.$message({
              message: '上链成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '上链失败',
              type: 'error'
            });
          }
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
        this.getList()
      })
        
      
    },
    
    
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/account.less';
</style>