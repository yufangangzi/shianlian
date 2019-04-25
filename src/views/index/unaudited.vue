<template>
  <div>
    <div class="gailan">概览</div>
    <!--待审核-->
    <div class="box2">
      <div class="top-bar">信息概览</div>
      <div class="jibenxinxi">基本信息</div>

      <div class="table-box">
        <el-table
        :data="beAuditedData"
        class="biaoge"
        :header-cell-style="biaostyle"
        border
        >
        <el-table-column 
          prop="name"
          label="企业名称"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="审批状态"
          align="center"
        >
          <template slot-scope="scope">
            <span type="text" size="small" :class="scope.row.status == 1 ? 'approvalColor' : scope.row.status == 2 ? 'rejectColor' : 'approvalColor' ">
              {{scope.row.status == 1 ? '审批中' : scope.row.status == 2 ? '审批驳回' : '审批成功'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="details"
          align="center"
          label="审批详情">
          <template slot-scope="scope">
            <div class="hidden" @click="approvalDetails">
              {{scope.row.details}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="企业创建"
          align="center"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" :disabled="scope.row.status == 2 ? false : true" @click="$router.push('/qyAudit?id=' + scope.row.id)">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table> 
      </div>
    </div>
    <!--待审核end-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px"
      >
        <h3>您的企业审核信息已提交！</h3>
        <p>
          您提交的新建企业申请已经提交成功，并已提交由系统管理员审核。通常，审核会在3~5个工作日内完成。
        </p>
        <p>在审核完成后，您将可以使用本账号作为企业管理员进行登录。</p>
        <p>如果您有任何疑问，欢迎随时联系我们，我们会第一时间帮您解决。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--审核驳回原因-->
    <el-dialog
      title=""
      :visible.sync="rejectVisible"
      width="380px"
    >
      <div class="rejectBox">
        <h3>审批驳回原因</h3>
        <div class="rejectCt">
          <h4>您的企业审核存在如下问题: </h4>
          <p v-for="(item,index) in approvalData " :key="index">
            {{item.content}}
          </p>
          <!-- <p>1.营业执照统一社会信用代码不清晰</p>
          <p>2.复印件未加盖企业公章</p> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!--审核驳回原因-->
  </div>
</template>
<script>
import api from '@/feath/api.js'
export default {
  data() {
    return {
      dialogVisible: false,
      rejectVisible: false,
      biaostyle: {
        backgroundColor: '#F6F7FB',
        fontSize: '14px',
        color: '#333',
        fontWeight: '400'
      },
      beAuditedData: [
        // {
        //   name: '青岛岸山农业集团',
        //   status: 0,
        //   details: '您的企业审核存在如下问题:1.营业执照统一社会信用代码不清晰2.复印件未加盖企业公章',
        //   id: 1
        // },
        // {
        //   name: '张三果蔬公司',
        //   status: 1,
        //   details: '您的企业审核存在如下问题:1.营业执照统一社会信用代码不清晰2.复印件未加盖企业公章',
        //   id: 2
        // }
      ],
      approvalData: [
        // {
        //   content: '第一条数据'
        // },
        // {
        //   content: '第二条数据'
        // }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.getStatusList()
  },
  methods: {
    approvalDetails () {
      this.rejectVisible = true;
    },
    getStatusList () {
      api.getOrgStatus({
        "organId": localStorage.getItem('u_organId')
      }).then(res => {
        if (res.code == 0) {
          this.beAuditedData.push({
            name: res.result.organName,
            status: res.result.approvalStatus,
            details: res.result.approvalDetail,
            id: res.result.id
          })
          this.approvalData.push({
            content: res.result.approvalDetail
          })
        }
      });
    }
  }
}

</script>

<style scoped >
  .gailan{

    padding-top: 8px;
    padding-left: 16px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:17px;
  }
  /* .xinxigailan{
    
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
   

  } */
  .box2{
    margin: 16px 0 24px 24px;
    padding-bottom: 60px;
    height:100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(232,236,240,1);
  }
  .jibenxinxi{
    margin-top: 0px;
    padding-left: 24px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .biaoge{
    margin-top: 8px;
    border:1px solid rgba(229,233,242,1);
  }
  .yingyongmiaoshu{
    padding-top: 32px;
    padding-left: 24px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .api{
    padding-left: 24px;
    padding-top: 32px;
    height:22px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .bottom {
    width:222px;
    height:64px;
    border:1px solid rgba(229,233,242,1);
  }
  .image {
    width: 34px;
    height: 34px;
    margin-top:15px ;
    margin-left:45px ;
  }
  .table-box{
    padding: 0 24px;
  }
  .card{
    display: inline-block;
    margin-left: 24px;
    margin-top: 8px;
    width:222px;
    height:64px;
    border:1px solid rgba(229,233,242,1);
  }
  .copy{
    display: inline-block;
    width:12px;
    height: 16px;
    background: url('../../assets/img/copy.png') no-repeat;
    background-size: 12px 16px;
    margin-left: 10px;
    cursor: pointer;
  }
  /* .xiaolandian{
    width:3px;
    height:20px;
    background:rgba(0,135,237,1);
    display: inline-block;
    margin-top:24px;
    margin-left:24px
  } */
  .box3{
    display: inline-block;
    margin-left: 8px;
  }
  .top-bar{
    font-size:16px;
    width: 100%;
    height:60px;
    line-height: 60px; 
    margin-left:6px; 
    
  }
  .top-bar::before{
    content: '';
    float: left;
    width:3px;
    height:20px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 4px;
    background:rgba(0,135,237,1);
  }
  .rejectColor{
    color: #FF5454;
  }
  .approvalColor{
    color: #4DD287;
  }
  .hidden{
    cursor: pointer;
    min-width: 250px;
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
  }
  .rejectBox h3{
    text-align: center;
    color: #514C4A;
    font-size: 16px;
    margin-bottom: 11px;
  }
  .rejectCt{
    max-width: 240px;
    margin: 0 auto;
  }
  .rejectCt h4{
    font-weight: normal;
    color: #54575A;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .rejectCt p{
    margin-bottom: 10px;
    color: #514C4A;
  }
  .rejectBox .dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
  }
  .rejectBox .el-button{
    width: 78px;
  }
</style>



