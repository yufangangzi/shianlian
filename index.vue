<template>
  <div>
    <div class="gailan">概览</div>
    <div class="box2">
      <p class="xinxigailan">信息概览</p>
      <h6 class="jibenxinxi">基本信息</h6>
      <el-table
        :data="tableData"
        stripe
        class="biaoge"
        border
        style="width: 1118px">
        <el-table-column 
          prop="name"
          label="企业名称"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="appid"
          label="AppID"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="lian"
          align="center"
          label="所在链条">
        </el-table-column>
        <el-table-column
          prop="keyapi"
          align="center"
          label="API Key">
        </el-table-column>
        <el-table-column
          prop="keysecret"
          align="center"
          label="Secret Key">
           <template slot-scope="scope">
            <el-button type="text" size="small">显示</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="食安认证"
          align="center"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6 class='yingyongmiaoshu'>应用描述</h6>
      <!-- <el-table
        :data="tableData1"
        stripe
        style="width: 100%">
        <el-table-column
          prop="totalsum"
          label="总调用量"
          align="center"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="totalday"
          label="今日调用"
          align="center"
          width="200"
          >
        </el-table-column>
      </el-table> -->
      <el-card :body-style="{ padding: '0px' }" class="card" >
        <img src="../../assets/img/总.png" class="image"> 
        <div style="padding: 14px ;float:right">
          <span>总调用量（次）</span>
          <br>
          <br>
          <span>{{totalsum}}</span>
          </div>
      </el-card>
      <el-card :body-style="{ padding: '0px'}" class="card" >
        <img src="../../assets/img/日.png" class="image"> 
        <div style="padding: 14px ;float:right">
          <span>今日调用量（次）</span>
          <br>
          <br>
          <span>{{totalday}}</span>
        </div>
      </el-card>
    

      <h6 class='api'>API列表</h6>
      <el-table
        :data="tableData2"
        stripe
        border
        class="biaoge"
        style="width: 1118px">
        <el-table-column
          prop="api"
          label="API"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="状态"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="url"
          label="请求地址"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="limit"
          label="调用量限制"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="limitnum"
          label="调用量"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="统计详情"
          align="center"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        name:'青岛岸山农业集团',
        appid:'18519226670',
        lian:'产地/加工/物流/销售',
        keyapi:'6FnB8gKicOtHwLbKvt7eQkK',
        keysecret:'******',
      }],
      tableData1:[{
        totalsum:'187820',
        totalday:'678',

      }],
      tableData2:[{
        api:'数据上传',
        type:'正常',
        url:'http://vop.baidu.com/server_api',
        limit:'无限量',
        limitnum:'111',
      },{
        api:'数据上传',
        type:'正常',
        url:'http://vop.baidu.com/server_api',
        limit:'无限量',
        limitnum:'111',
      },{
        api:'数据上传',
        type:'正常',
        url:'http://vop.baidu.com/server_api',
        limit:'无限量',
        limitnum:'111',
      },{
        api:'数据上传',
        type:'正常',
        url:'http://vop.baidu.com/server_api',
        limit:'无限量',
        limitnum:'111',
      }],
      totalsum:"187820",
      totalday:"567",
    }
  }
}
</script>

<style>
  .gailan{

    padding-top: 8px;
    padding-left: 16px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:17px;
  }
  .xinxigailan{
    padding-top: 24px;
    padding-left: 35px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .box2{
    margin-top: 41px;
    margin-left: 24px;
    width:1166px;
    height:100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(232,236,240,1);
  }
  .jibenxinxi{
    padding-top: 11px;
    padding-left: 24px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .biaoge{
    margin-left: 24px;
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
  .card{
    margin-left: 24px;
    margin-top: 8px;
    width:222px;
    height:64px;
    border:1px solid rgba(229,233,242,1);
  }
</style>



