<template>
  <div class="details">
    <div class="gailan">概览/企业审核</div>
    <div class="detailBox">
      <div class="top-bar">企业信息</div>
      <div class="detailCt">
        <p>
          <span class="detailLeft">企业名称：</span>
          <span class="detailRt">青岛大成集团</span>
        </p>
        <p>
          <span class="detailLeft">统一社会信用代码：</span>
          <span class="detailRt">9144030071526726XG</span>
        </p>
        <p>
          <span class="detailLeft">注册地址：</span>
          <span class="detailRt">山东省青岛市黄岛区铁橛山路1111号石桥大厦</span>
        </p>
        <p>
          <span class="detailLeft">联络地址：</span>
          <span class="detailRt">山东省青岛市黄岛区铁橛山路1111号石桥大厦</span>
        </p>
        <p>
          <span class="detailLeft">法人代表：</span>
          <span class="detailRt">赵敏</span>
        </p>
        <p>
          <span class="detailLeft">归属地区：</span>
          <span class="detailRt">山东省青岛市黄岛区</span>
        </p>
        <p>
          <span class="detailLeft">生产许可证：</span>
          <span class="detailRt">12356450</span>
        </p>
        <p>
          <span class="detailLeft">种养殖许可证：</span>
          <span class="detailRt">12356450</span>
        </p>
        <p>
          <span class="detailLeft">上链类型：</span>
          <span class="detailRt">产地链/销售链</span>
        </p>
        <p>
          <span class="detailLeft">工商营业执照：</span>
          <span class="detailRt"><img src="../../assets/img/loginbg.png"/></span>
        </p>
      </div>
      <div class="detailBt">
        <el-button @click="$router.replace('/enterpriseAudit')" class="backBtn">返回</el-button>
        <el-button type="primary" @click="adopt" class="adoptBtn">通过</el-button>
        <el-button type="info" @click="refuse" class="refuseBtn">拒绝</el-button>
      </div>
    </div>
    <adopt-dialog :adoptVisible="adoptVisible" :adoptOk="adoptOk"></adopt-dialog>
    <refuse-dialog v-if="refuseVisible" :refuseVisible="refuseVisible" :refuseCancel="refuseCancel" :refuseOk="refuseOk"></refuse-dialog>
  </div>
</template>
<script>
import api from '@/feath/api.js'
import AdoptDialog from './adopt-dialog.vue'
import RefuseDialog from './refuse-dialog.vue'
  export default {
    data() {
      return {
        adoptVisible: false,
        refuseVisible: false
      };
    },
    components: {
      AdoptDialog,
      RefuseDialog
    },
    methods: {
      // 通过审核
      adopt () {
        this.adoptVisible = true;
      },
      adoptOk () {
        this.adoptVisible = false;
      },
      // 拒绝审核
      refuse () {
        this.refuseVisible = true;
      },
      refuseCancel () {
        this.refuseVisible = false;
      },
      refuseOk (data) {
        this.refuseVisible = false;
      },
      orgDetail (id) {
        let data = {
          id: id
        }
        api.getOrgDetail(data).then(res => {
          console.log(res)
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
.detailBox {
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
.detailCt{
  padding: 20px 165px;
  color: #555555;
}
.detailCt p{
  font-size: 18px;
  margin-bottom: 30px;
}
.detailCt p .detailLeft{
  width: 162px;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
.detailCt p .detailRt{
  width: 75%;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
}
.detailCt img{
  width: 100%;
}
.detailBt{
  display: flex;
  justify-content: center;
}
.backBtn{
  width: 110px;
  border: 1px solid #8C8C8C;
  margin-left: 100px;
  margin-right: 60px;
}
.adoptBtn{
  width: 110px;
  background: #4DD287;
  border: 1px solid #44B073;
  margin-right: 60px;
}
.refuseBtn{
  width: 110px;
  background: #FF5454;
  border: 1px solid #CE1D1D;
}
</style>
