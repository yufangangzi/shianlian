<template>
  <div class="enterpriseAudit">
    <div class="gailan">概览</div>
    <div class="eAuditBox">
      <div class="top-bar">信息概览</div>
      <div class="table-box">
        <el-table :data="tableData" class="biaoge" :header-cell-style="biaostyle" border="">
          <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="creditCode" label="统一信用代码" align="center"></el-table-column>
          <el-table-column prop="address" label="注册地址" align="center"></el-table-column>
          <el-table-column prop="chain" align="center" label="申请链条"></el-table-column>
          <el-table-column prop="time" align="center" label="申请时间"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push('/companyDetails?id=' + scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="adopt(scope.row.id)" class="adopt">通过</el-button>
              <el-button type="text" size="small" @click="refuse(scope.row.id)" class="refuse">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes, jumper"
        :page-size="totalPageSize"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
        style="text-align: center"
        @current-change="gotoPage"
        :current-page="currentPageNum"
        :total="listNum">
      </el-pagination>
    </div>
    <adopt-dialog :adoptVisible="adoptVisible" :adoptOk="adoptOk"></adopt-dialog>
    <refuse-dialog v-if="refuseVisible" :refuseVisible="refuseVisible" :refuseCancel="refuseCancel" :refuseOk="refuseOk"></refuse-dialog>
  </div>
</template>
<script>
import api from '@/feath/api.js'
import { formatDate } from '@/util/filter.js'
import AdoptDialog from './adopt-dialog.vue'
import RefuseDialog from './refuse-dialog.vue'
export default {
  data() {
    return {
      biaostyle: {
        backgroundColor: '#F6F7FB',
        fontSize: '14px',
        color: '#333',
        fontWeight: '400'
      },
      tableData: [
        // {
        //   name: "青岛岸山农业集团",
        //   creditCode: "9144030071526726XG",
        //   address: "青岛市崂山区香港东路23号",
        //   chain: "产地",
        //   time: "2019/4/18",
        //   id: '1'
        // },
        // {
        //   name: "张三果蔬公司",
        //   creditCode: "9144030071526726XG",
        //   address: "青岛市崂山区香港东路23号",
        //   chain: "产地",
        //   time: "2019/4/18",
        //   id: '2'
        // }
      ],
      currentPageNum: 1,
      totalPageSize: 10,
      listNum: 0,
      adoptVisible: false,
      refuseVisible: false,
      refuseId: '',
      id: ''
    };
  },
  components: {
    AdoptDialog,
    RefuseDialog
  },
  created () {
    this.id = Number(this.$route.query.id);
  },
  mounted () {
    this.getOrgList()
  },
  methods: {
    handleSizeChange(val) {
      // console.log(val)
      this.totalPageSize = val;
      this.getOrgList()
    },
    gotoPage (currentPage) {
      this.currentPageNum = currentPage;
      this.getOrgList()
    },
    // 通过审核
    adopt (id) {
      let data = {
        id: id
      }
      api.orgPass(data).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.adoptVisible = true;
          this.getOrgList()
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    adoptOk () {
      this.adoptVisible = false;
    },
    // 拒绝审核
    refuse (id) {
      this.refuseVisible = true;
      this.refuseId = id;
    },
    refuseCancel () {
      this.refuseVisible = false;
    },
    refuseOk (data) {
      if (!data) {
        this.$message.error('请输入拒绝原因');
        return false;
      }
      let oData = {
        approvalDetail: data,
        id: this.refuseId
      }
      api.orgRefuse(oData).then(res => {
        if (res.code == 0) {
          this.$message({
            message: '拒绝成功！',
            type: 'success'
          });
          this.refuseVisible = false;
          this.getOrgList()
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    getOrgList () {
      let data = {
        "orderBy": "apply_time desc",
        "id": this.id,
        "pageNum": this.currentPageNum,
        "pageSize": this.totalPageSize,
      }
      api.getOrgList(data).then(res => {
        this.tableData = [];
        if (res.code == 0 && res.result.list.length !== 0) {
          this.tableData = res.result.list.map((item, index) => {
            return {
              name: item.name,
              creditCode: item.creditCode,
              address: item.registerAddress,
              chain: item.applyChain,
              time: formatDate(item.applyTime,'yyyy/MM/dd'),
              id: item.id
            }
          })
          this.listNum = res.result.total
        }
      })
    }
  }
};
</script>

<style scoped>
.gailan {
  padding-top: 8px;
  padding-left: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 17px;
}
.eAuditBox {
  margin: 16px 0 24px 24px;
  padding-bottom: 60px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(232, 236, 240, 1);
}
.top-bar {
  font-size: 16px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-left: 6px;
}
.top-bar::before {
  content: "";
  float: left;
  width: 3px;
  height: 20px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 4px;
  background: rgba(0, 135, 237, 1);
}
.table-box{
  padding: 0 24px;
}
.adopt{
  color: #4DD287;
}
.refuse{
  color: #FF5454;
}
</style>