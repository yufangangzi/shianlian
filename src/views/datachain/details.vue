<template>
  <div class="details" v-if="type==1">
    <div class="gailan">数据上链/{{detailId=='' ? '新建': '编辑'}}数据</div>
    <div class="detailBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" :label-position="labelPosition" :inline-message="true" class="demo-ruleForm">
        <el-form-item label="数据标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="业务链" prop="chain">
          <el-radio-group v-model="ruleForm.chain">
            <el-radio :label="1">产地链</el-radio>
            <el-radio :label="2" disabled>加工链</el-radio>
            <el-radio :label="3" disabled>销售链</el-radio>
            <el-radio :label="4" disabled>物流链</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="产品" name="first">
            <el-form-item label="产品ID" prop="productId">
              <el-input v-model="ruleForm.productId"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="">
              <el-input v-model="ruleForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品类别" prop="">
              <el-select v-model="ruleForm.productType" clearable placeholder="请选择">
                <el-option
                  v-for="item in productTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品属性" prop="">
              <el-select v-model="ruleForm.productProp" clearable placeholder="请选择">
                <el-option
                  v-for="item in productPropList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="常用流通名称" prop="">
              <el-input v-model="ruleForm.circulationName"></el-input>
            </el-form-item>
            <el-form-item label="准确学术名称" prop="">
              <el-input v-model="ruleForm.scienceName"></el-input>
            </el-form-item>
            <el-form-item label="国际条码" prop="">
              <el-input v-model="ruleForm.barCode"></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="地块" name="second">
            <el-form-item label="地块ID" prop="landId">
              <el-input v-model="ruleForm.landId"></el-input>
            </el-form-item>
            <el-form-item label="归属产地单位" prop="">
              <el-input v-model="ruleForm.productPlace"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="">
              <el-input v-model="ruleForm.area"></el-input>
            </el-form-item>
            <el-form-item label="土壤特性" prop="">
              <el-input v-model="ruleForm.soilProp"></el-input>
            </el-form-item>
            <el-form-item label="目前主要作物" prop="">
              <el-input v-model="ruleForm.mainCrops"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane disabled label="生产农事" name="third">生产农事</el-tab-pane>
          <el-tab-pane disabled label="农事基本资料" name="fourth">农事基本资料</el-tab-pane>
        </el-tabs>

        <el-form-item>
          <el-button @click="$router.go(-1);">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存全部</el-button>
        </el-form-item>
        
        <!-- <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
         -->
      </el-form>
    </div>
  </div>
  <div class="details" v-else>
    <div class="gailan">数据上链/查看数据</div>
    <div class="detailBox">
      <div class="top-bar">企业审核</div>
      <div class="detailCt">
        <h3 class="detailTitle">企业信息</h3>
        <p>
          <span class="detailLeft">企业名称</span>
          <span class="detailRt">青岛大成集团</span>
        </p>
        <p>
          <span class="detailLeft">统一社会信用代码</span>
          <span class="detailRt">9144030071526726XG</span>
        </p>
        <p>
          <span class="detailLeft">注册地址</span>
          <span class="detailRt">山东省青岛市黄岛区铁橛山路1111号石桥大厦</span>
        </p>
        <p>
          <span class="detailLeft">联络地址</span>
          <span class="detailRt">山东省青岛市黄岛区铁橛山路1111号石桥大厦</span>
        </p>
        <p>
          <span class="detailLeft">法人代表</span>
          <span class="detailRt">赵敏</span>
        </p>
        <p>
          <span class="detailLeft">归属地区</span>
          <span class="detailRt">山东省青岛市黄岛区</span>
        </p>
        <p>
          <span class="detailLeft">生产许可证</span>
          <span class="detailRt">12356450</span>
        </p>
        <p>
          <span class="detailLeft">种养殖许可证</span>
          <span class="detailRt">12356450</span>
        </p>
        <p>
          <span class="detailLeft">上链类型</span>
          <span class="detailRt">产地链/销售链</span>
        </p>
        <p>
          <h3>工商营业执照</h3>
          <img src="../../assets/img/loginbg.png"/>
        </p>
      </div>
      <div class="detailBt">
        <el-button @click="$router.replace('/enterpriseAudit')">返回</el-button>
        <el-button type="primary" @click="adopt">通过</el-button>
        <el-button type="info" @click="refuse">拒绝</el-button>
      </div>
    </div>
    <adopt-dialog :adoptVisible="adoptVisible" :adoptOk="adoptOk"></adopt-dialog>
    <refuse-dialog v-if="refuseVisible" :refuseVisible="refuseVisible" :refuseCancel="refuseCancel" :refuseOk="refuseOk"></refuse-dialog>
  </div>
</template>
<script>
import AdoptDialog from './adopt-dialog.vue'
import RefuseDialog from './refuse-dialog.vue'
  export default {
    data() {
      return {
        adoptVisible: false,
        refuseVisible: false,
        type: 2,
        detailId: '',
        labelPosition: 'left',
        activeName: 'first',

        productTypeList: [
          {
            value: '1',
            label: '蔬菜'
          }, 
          {
            value: '2',
            label: '水果'
          },
          {
            value: '3',
            label: '肉类'
          },
          {
            value: '4',
            label: '禽类'
          },
          {
            value: '5',
            label: '蛋类'
          },

        ],
        productPropList: [
          {
            value: '1',
            label: '种植'
          }, 
          {
            value: '2',
            label: '养殖'
          },
          {
            value: '3',
            label: '加工'
          },

        ],

        ruleForm: {
          title: '',
          chain: 1,
          productId: 'test1234',   
          productName: '',
          productType: '',
          productProp: '',  
          circulationName: '',  
          scienceName: '',  
          barCode: '',

          landId: 'test1234',
          productPlace: '',
          area: '',
          soilProp: '',
          mainCrops: '',

          // name: '',
          // region: '',
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: [],
          // resource: '',
          // desc: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入数据标题', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          chain: [
            { required: true, message: '请选择业务链', trigger: 'change' }
          ],
          productId: [
            { required: true, message: '请输入产品ID', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          productType: [
            { required: true, message: '请选择产品类别', trigger: 'change' }
          ],
          productProp: [
            { required: true, message: '请选择产品属性', trigger: 'change' }
          ],
          circulationName: [
            { required: true, message: '请输入常用流通名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          scienceName: [
            { required: true, message: '请输入准确学术名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          barCode: [
            { required: true, message: '请输入国际条码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],


          // name: [
          //   { required: true, message: '请输入活动名称', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
          // region: [
          //   { required: true, message: '请选择活动区域', trigger: 'change' }
          // ],
          // date1: [
          //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          // ],
          // date2: [
          //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          // ],
          // type: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          // resource: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          // ],
          // desc: [
          //   { required: true, message: '请填写活动形式', trigger: 'blur' }
          // ]
        }
      };
    },
    components: {
      AdoptDialog,
      RefuseDialog
    },
    mounted: function () {
      // debugger;
      this.type = this.$route.query.type;
      if(this.$route.query.id){
        this.detailId = this.$route.query.id;
      }
      console.log('this.type', this.type);
      console.log('this.detailId', this.detailId);
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  };
</script>
<style lang="less" scoped>
.detailBox {
  & .demo-ruleForm{
    width: 80%;
    padding: 30px 20px;
  }
  & .el-input {
    width: 80%;
  }
}
</style>
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
  padding: 40px 60px;
}
.detailCt p{
  margin-top: 20px;
  margin-bottom: 20px;
}
.detailCt p .detailLeft{
  width: 50px;
  display: inline-block;
  margin-right: 20px;
}
.detailCt p h3{
  font-weight: normal;
}
.detailCt img{
  width: 90%;
  margin-top: 20px;
}
.detailBt{
  text-align: center;
}
</style>
