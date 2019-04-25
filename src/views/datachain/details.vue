<template>
  <div class="details" v-if="type==1">
    <div class="gailan">数据上链/{{detailId=='' ? '新建': '编辑'}}数据</div>
    <div class="detailBox">
      <div class="top-bar">{{detailId=='' ? '新建': '编辑'}}数据</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" :label-position="labelPosition" :inline-message="true" class="demo-ruleForm">
        <el-form-item label="数据标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="业务链" prop="">
          <!-- <el-radio-group v-model="ruleForm.chain">
            <el-radio :label="1">产地链</el-radio>
            <el-radio :label="2" disabled>加工链</el-radio>
            <el-radio :label="3" disabled>销售链</el-radio>
            <el-radio :label="4" disabled>物流链</el-radio>
          </el-radio-group> -->
          <el-row>
            <el-button type="primary" plain>产地链</el-button>
            <el-button type="info" plain disabled>加工链</el-button>
            <el-button type="info" plain disabled>销售链</el-button>
            <el-button type="info" plain disabled>物流链</el-button>
          </el-row>
        </el-form-item>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="产品" name="first">
            <el-form-item label="产品ID" prop="productId" v-show="false">
              <el-input v-model="ruleForm.productId" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="">
              <el-input v-model="ruleForm.productName" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="产品类别" prop="">
              <el-select v-model="ruleForm.productType" clearable placeholder="请选择" class="lvwidth">
                <el-option
                  v-for="item in productTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品属性" prop="">
              <el-select v-model="ruleForm.productProp" clearable placeholder="请选择" class="lvwidth">
                <el-option
                  v-for="item in productPropList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="常用流通名称" prop="">
              <el-input v-model="ruleForm.circulationName" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="准确学术名称" prop="">
              <el-input v-model="ruleForm.scienceName" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="国际条码" prop="">
              <el-input v-model="ruleForm.barCode" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="产品图片" prop="">
              <el-upload
                class="avatar-uploader"
                :headers="customHeaders"
                :action="uploadUrl"
                name="imageFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <div class="avatar" style="display:inline-block;">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <img v-else src="../../assets/img/default-up.png" style="margin:35px 51px;">
                </div>
                <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                <div class="avatar-right" style="display:inline-block;margin-left:24px;text-align: left;">
                  <div slot="tip" class="el-upload__tip txt">
                    格式要求：<br>
                    请上传产品图片，将显示为溯源产品题图。 <br>
                    支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。
                  </div>
                  <el-button size="small" type="primary">点击上传</el-button>
                </div>
              </el-upload>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="地块" name="second">
            <el-form-item label="地块ID" prop="landId" v-show="false">
              <el-input v-model="ruleForm.landId"></el-input>
            </el-form-item>
            <el-form-item label="归属产地单位" prop="">
              <el-input v-model="ruleForm.productPlace" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="">
              <el-input v-model="ruleForm.area" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="土壤特性" prop="">
              <el-input v-model="ruleForm.soilProp" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="目前主要作物" prop="">
              <el-input v-model="ruleForm.mainCrops" class="lvwidth"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane disabled label="生产农事" name="third">生产农事</el-tab-pane>
          <el-tab-pane disabled label="农事基本资料" name="fourth">农事基本资料</el-tab-pane>
        </el-tabs>

        <el-form-item>
          <el-button @click="$router.go(-1);">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
        
        
      </el-form>
    </div>
  </div>
  <div class="details" v-else>
    <div class="gailan">数据上链/查看数据</div>
    <div class="detailBox">
      <div class="top-bar">查看数据数据</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" :label-position="labelPosition" :inline-message="true" class="demo-ruleForm">
        <el-form-item label="数据标题" prop="title">
          <el-input disabled v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="业务链" prop="">
          <!-- <el-radio-group v-model="ruleForm.chain">
            <el-radio :label="1">产地链</el-radio>
            <el-radio :label="2" disabled>加工链</el-radio>
            <el-radio :label="3" disabled>销售链</el-radio>
            <el-radio :label="4" disabled>物流链</el-radio>
          </el-radio-group> -->
          <el-row>
            <el-button type="primary" plain disabled>产地链</el-button>
            <el-button type="info" plain disabled>加工链</el-button>
            <el-button type="info" plain disabled>销售链</el-button>
            <el-button type="info" plain disabled>物流链</el-button>
          </el-row>
        </el-form-item>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="产品" name="first">
            <el-form-item label="产品ID" prop="productId" v-show="false">
              <el-input disabled v-model="ruleForm.productId" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="">
              <el-input disabled v-model="ruleForm.productName" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="产品类别" prop="">
              <el-select disabled v-model="ruleForm.productType" clearable placeholder="请选择" class="lvwidth">
                <el-option
                  v-for="item in productTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品属性" prop="">
              <el-select disabled v-model="ruleForm.productProp" clearable placeholder="请选择" class="lvwidth">
                <el-option
                  v-for="item in productPropList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="常用流通名称" prop="">
              <el-input disabled v-model="ruleForm.circulationName" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="准确学术名称" prop="">
              <el-input disabled v-model="ruleForm.scienceName" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="国际条码" prop="">
              <el-input disabled v-model="ruleForm.barCode" class="lvwidth"></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="地块" name="second">
            <el-form-item label="地块ID" prop="landId" v-show="false">
              <el-input disabled v-model="ruleForm.landId"></el-input>
            </el-form-item>
            <el-form-item label="归属产地单位" prop="">
              <el-input disabled v-model="ruleForm.productPlace" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="">
              <el-input disabled v-model="ruleForm.area" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="土壤特性" prop="">
              <el-input disabled v-model="ruleForm.soilProp" class="lvwidth"></el-input>
            </el-form-item>
            <el-form-item label="目前主要作物" prop="">
              <el-input disabled v-model="ruleForm.mainCrops" class="lvwidth"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane disabled label="生产农事" name="third">生产农事</el-tab-pane>
          <el-tab-pane disabled label="农事基本资料" name="fourth">农事基本资料</el-tab-pane>
        </el-tabs>

        <el-form-item>
          <el-button @click="$router.go(-1);">返回</el-button>
        </el-form-item>
        
        
      </el-form>
    </div>
    <adopt-dialog :adoptVisible="adoptVisible" :adoptOk="adoptOk"></adopt-dialog>
    <refuse-dialog v-if="refuseVisible" :refuseVisible="refuseVisible" :refuseCancel="refuseCancel" :refuseOk="refuseOk"></refuse-dialog>
  </div>
</template>
<script>
import api from '@/feath/api.js'
import {complaintUploadUrl} from '@/feath/server/http.js'
import AdoptDialog from './adopt-dialog.vue'
import RefuseDialog from './refuse-dialog.vue'
  export default {
    data() {
      return {
        adoptVisible: false,
        refuseVisible: false,
        type: 2,
        detailId: '',
        labelPosition: 'right',
        activeName: 'first',

        imageUrl: '',
        imageUrl2: '',
        uploadUrl: complaintUploadUrl,
        customHeaders: {
          'identity-authentic-request-header': localStorage.getItem('access_token'),
        },

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
      handleAvatarSuccess(res, file) {
        // debugger;
        if(res.code===0 && res.result){
          this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrl2 = res.result;
        }
      },
      beforeAvatarUpload(file) {
        const imgFormat = {
          'image/jpeg': true,
          'image/jpg': true,
          'image/png': true,
          'image/gif': true,
          'image/bmp': true,
          'image/gif': true,
        }
        // const isJPG = file.type === 'image/jpeg';
        const isJPG = imgFormat[file.type] ? true: false;
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
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
          // debugger
          if (valid) {
            // alert('submit!');
            console.log(this.ruleForm);
            let saveOp = api.dataChainSave;
            if(this.detailId){
              saveOp = api.dataChainUpdate;
            }
            
            let dikuai = [
              ['归属产地单位', this.ruleForm.productPlace],
              ['面积', this.ruleForm.area],
              ['土壤特性', this.ruleForm.soilProp],
              ['目前主要作物', this.ruleForm.mainCrops]
            ];
            
            let data = {
              "academicName": this.ruleForm.scienceName,
              "attribute": this.ruleForm.productProp,
              "barCode": this.ruleForm.barCode,
              "category": this.ruleForm.productType,
              "code": "",
              "imageurl":"sss.jpg",
              "foodProductDetailDTOList": [
                {
                  "logName": "地块",//（必填，固定值“地块”）
                  "logRemark": "归属产地单位：基施高钾水溶肥、螯合锌微肥\n主要农资生产商：国灵集团",
                  "macId": 11//（必填，固定值 11）
                }
              ],
              "name": this.ruleForm.productName,
              "title": this.ruleForm.title,//（必填）
              "usuallyName": this.ruleForm.circulationName
            };
            data.foodProductDetailDTOList[0].logRemark = dikuai.map((v) => v[0] + '：' +v[1]).join('\n');

            if(this.imageUrl2){
              data.imageurl = this.imageUrl2;
            }

            console.log(JSON.stringify(data))
            // debugger;
            // return;
            saveOp(data).then(res => {
              debugger;
              if (res.code === 0) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.$router.go(-1);
              } else {
                this.$message({
                  message: '保存失败',
                  type: 'error'
                });
              }
              
            })
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
<style lang="less">
.detailBox {
  & .el-tabs__header {
    padding-left: 100px;
  }
  & .el-tabs__active-bar {
    background-color: #02B389;
  }
  & .el-tabs__item.is-active{
    color: #333333;
  }
  & .el-tabs__item:hover{
    color: #02B389;
  }
}
</style>
<style lang="less" scoped>
.detailBox {
  & .demo-ruleForm{
    width: 80%;
    padding: 30px 20px;
  }
  & .el-input {
    width: 80%;
  }

  .lvwidth {
    width: 224px;
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    display: block;
    width:160px;
    height:120px;
    background:rgba(247,247,247,1);
    border:1px solid rgba(215,215,215,1);
  }
  .avatar-right{
    vertical-align: top;
  }
  .avatar-right .txt{
    width:358px;
    height:60px;
    /*font-size:14px;*/
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(137,137,137,1);
    line-height:20px;
    text-align: left;
  }
</style>
