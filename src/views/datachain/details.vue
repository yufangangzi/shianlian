<template>
  <div class="details" v-if="type==1">
    <div class="gailan">数据上链/{{detailId=='' ? '新建': '编辑'}}数据</div>
    <div class="detailBox">
      <div class="top-bar">{{detailId=='' ? '新建': '编辑'}}数据</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" :label-position="labelPosition" :inline-message="true" class="demo-ruleForm">
        <el-form-item label="数据标题" prop="title">
          <el-input v-model="ruleForm.title" ref="title" @focus="tfocus"></el-input>
        </el-form-item>
        <el-form-item label="业务链" prop="">
          <!-- <el-radio-group v-model="ruleForm.chain">
            <el-radio :label="1">产地链</el-radio>
            <el-radio :label="2" disabled>加工链</el-radio>
            <el-radio :label="3" disabled>销售链</el-radio>
            <el-radio :label="4" disabled>物流链</el-radio>
          </el-radio-group> -->
          <el-row>
            <el-button @click="btnFn(1)" :type="!belong1 ? 'primary' : 'info'" :plain="btnIndex!=1" :disabled="belong1">产地链</el-button>
            <el-button @click="btnFn(2)"  :type="!belong2 ? 'primary' : 'info'" :plain="btnIndex!=2" :disabled="belong2">加工链</el-button>
            <el-button @click="btnFn(4)"  :type="!belong4 ? 'primary' : 'info'" :plain="btnIndex!=4" :disabled="belong4">物流链</el-button>
            <el-button @click="btnFn(3)"  :type="!belong3 ? 'primary' : 'info'" :plain="btnIndex!=3" :disabled="belong3">销售链</el-button>
          </el-row>
        </el-form-item>

        <div v-show="btnIndex==1">
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
        </div>
        <div v-show="btnIndex!=1">
          <el-form-item>

            <el-button @click="$router.go(-1);">返回</el-button>
            
          </el-form-item>
        </div>
        
        
      </el-form>
    </div>
  </div>
  <div class="details" v-else>
    <div class="gailan">数据上链/查看数据</div>
    <div class="detailBox">
      <div class="top-bar">查看数据</div>
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
            <el-form-item label="产品图片" prop="">
              <el-upload
                disabled
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
                <!-- <div class="avatar-right" style="display:inline-block;margin-left:24px;text-align: left;">
                  <div slot="tip" class="el-upload__tip txt">
                    格式要求：<br>
                    请上传产品图片，将显示为溯源产品题图。 <br>
                    支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。
                  </div>
                  <el-button size="small" type="primary">点击上传</el-button>
                </div> -->
              </el-upload>
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
import {complaintUploadUrl, baseURL} from '@/feath/server/http.js'
import AdoptDialog from './adopt-dialog.vue'
import RefuseDialog from './refuse-dialog.vue'
  export default {
    data() {
      return {
        chainList: '产地链',
        btnIndex: 1,
        belong1: true,
        belong2: true,
        belong3: true,
        belong4: true,

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
            value: '蔬菜',
            label: '蔬菜'
          }, 
          {
            value: '水果',
            label: '水果'
          },
          {
            value: '肉类',
            label: '肉类'
          },
          {
            value: '禽类',
            label: '禽类'
          },
          {
            value: '蛋类',
            label: '蛋类'
          },

        ],
        productPropList: [
          {
            value: '种植',
            label: '种植'
          }, 
          {
            value: '养殖',
            label: '养殖'
          },
          {
            value: '加工',
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


        }
      };
    },
    components: {
      AdoptDialog,
      RefuseDialog
    },
    mounted: function () {
      // debugger;
      if(localStorage.getItem('o_chainList')){
        this.chainList = localStorage.getItem('o_chainList');
        if(this.chainList.indexOf('产地链')>-1){
          this.belong1 = false;
        }
        if(this.chainList.indexOf('加工链')>-1){
          this.belong2 = false;
          if(this.belong1){
            this.btnIndex = 2;
          }
        }
        if(this.chainList.indexOf('销售链')>-1){
          this.belong3 = false;
          if(this.belong1){
            this.btnIndex = 3;
          }
        }
        if(this.chainList.indexOf('物流链')>-1){
          this.belong4 = false;
          if(this.belong1){
            this.btnIndex = 4;
          }
        }
      }
      this.type = this.$route.query.type;
      if(this.$route.query.id){
        this.detailId = this.$route.query.id * 1;
        this.getDetail();
      }
      console.log('this.type', this.type);
      console.log('this.detailId', this.detailId);
    },
    methods: {
      btnFn(i){
        console.log(i);
        this.btnIndex = i;
      },
      getDetail () {
        const data = {
          id: this.detailId
        }
        api.dataChainGet(data).then(res => {
          // debugger
          //模拟测试数据
          // res.code = 0
          // res.result = {"id":44,"name":"大兴西瓜","code":"","traceCode":"44","category":"2","attribute":"1","legalPerson":"冯敏","address":"杭州市江干区九盛路9号A13幢4楼423室","enterprise":"杭州如涵控股股份有限公司","imageUrl":"/group1/M00/00/07/CpCEWFzBbWqAbuZcAABShQcS1Pg768.jpg","openId":null,"chainStatus":1,"title":"大兴西瓜棒棒哒","tradingId":"d622ba7804f0f05339e868b7c9b986ee8f83a322f621c2f7d56f542c336a0198","organId":11,"usuallyName":"大兴西瓜大兴西瓜","academicName":"大兴西瓜S8","barCode":"SN0230233232","updateTime":1556183646000,"foodProductDetailVOList":null};
          if (res.code ===0) {
            const result = res.result;
            const obj = {
              title: result.title,
              chain: 1,
              productId: 'test1234',   
              productName: result.name,
              productType: result.category,
              productProp: result.attribute,  
              circulationName: result.usuallyName,  
              scienceName: result.academicName,  
              barCode: result.barCode,

              landId: 'test1234',
              productPlace: '',
              area: '',
              soilProp: '',
              mainCrops: '',

              
            }
            // debugger;
            if(result.foodProductDetailVOList && Array.isArray(result.foodProductDetailVOList) && result.foodProductDetailVOList.length===1){
              const logRemark = result.foodProductDetailVOList[0].logRemark;
              logRemark.split('\\n').forEach((it, i) =>{
                const v = it.split('：')[1]
                if(i===0){
                  obj.productPlace = v;
                }else if(i===1){
                  obj.area = v;
                }else if(i===2){
                  obj.soilProp = v;
                }else if(i===3){
                  obj.mainCrops = v;
                }

              })

              if(result.foodProductDetailVOList[0].id){
                this.foodProductDetail = result.foodProductDetailVOList[0].id;
              }
            }
            // debugger;


            this.ruleForm = Object.assign({}, this.ruleForm, obj);

            if(result.imageUrl){
              this.imageUrl = baseURL + result.imageUrl;
              this.imageUrl2 = result.imageUrl;
            }
            
          }
        })
      },
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
          this.$message.error('上传图片只能是 JPG,PNG,BMP 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
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
      tfocus(){

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // debugger
          if (valid) {
            // alert('submit!');
            console.log(this.ruleForm);
            
            
            let dikuai = [];
            if(this.ruleForm.productPlace){
              dikuai.push(['归属产地单位', this.ruleForm.productPlace]);
            }
            if(this.ruleForm.area){
              dikuai.push(['面积', this.ruleForm.area]);
            }
            if(this.ruleForm.soilProp){
              dikuai.push(['土壤特性', this.ruleForm.soilProp]);
            }
            if(this.ruleForm.mainCrops){
              dikuai.push(['目前主要作物', this.ruleForm.mainCrops]);
            }
            
            let data = {
              "academicName": this.ruleForm.scienceName,
              "attribute": this.ruleForm.productProp,
              "barCode": this.ruleForm.barCode,
              "category": this.ruleForm.productType,
              "code": "",
              "imageUrl":"",
              "foodProductDetailDTOList": [
                {
                  "logName": "地块",//（必填，固定值“地块”）
                  "logRemark": "归属产地单位：基施高钾水溶肥、螯合锌微肥\\n主要农资生产商：国灵集团",
                  "macId": 11//（必填，固定值 11）
                }
              ],
              "name": this.ruleForm.productName,
              "title": this.ruleForm.title,//（必填）
              "usuallyName": this.ruleForm.circulationName
            };
            data.foodProductDetailDTOList[0].logRemark = dikuai.map((v) => v[0] + '：' +v[1]).join('\\n');

            if(this.imageUrl2){
              data.imageUrl = this.imageUrl2;
            }

            let saveOp = api.dataChainSave;
            if(this.detailId){
              saveOp = api.dataChainUpdate;
              data.id = this.detailId;
              if(this.foodProductDetail){
                data.foodProductDetailDTOList[0].id = this.foodProductDetail;
              }
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
            this.$refs.title.focus();
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
