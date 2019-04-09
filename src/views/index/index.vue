<template>
  <div>
    <div>概览</div>
    <div>
      <h4>信息概览</h4>
      <h6>基本信息</h6>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
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
      <h6>数据概览</h6>
      <el-table
        :data="tableData"
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
      </el-table>
      <h6>API列表</h6>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
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
      tableData: []
    }
  }
}
</script>