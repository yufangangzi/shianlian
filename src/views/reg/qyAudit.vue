<template>
  <div class="details">
    <div class="gailan">概览/企业审核</div>
    <div class="detailBox">
      <div class="top-bar">企业信息</div>
      <div class="regdemo">
      <el-form ref="form" :model="tabForm" label-width="150px" :rules="ruleValidate">
         <div class="stepBox">
            <span class="step1" :class="{'stepActive':isShow == 1}">
              1.企业信息
              <a :class="[isShow==1 ? 'blue_arrow' : 'gray_arrow' ]"></a>
            </span>
            <span class="step2" :class="{'stepActive':isShow == 2}">
              2.提交审核
            </span>
          </div>
          <!-- <el-steps :active="active" simple class="step">
            <el-step title="1企业信息" icon="none"></el-step>
            <el-step title="2提交审核" icon="none"></el-step>
          </el-steps> -->
          <!-- 头部step -->
          <!-- 账户信息end -->
        <div class="step2" v-show="isShow == 1">
        <!-- <div> -->
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="企业名称："  placeholder="请输入企业名称"  prop="qyName">
                      <el-input v-model="tabForm.qyName" size="small" class="lvwidth" ></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="统一社会信用代码：" prop="qyNumber" label-width="150px">
                      <el-input v-model="tabForm.qyNumber" size="small" class="lvwidth" ></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="注册地址：" prop="regAddress">
                      <el-input v-model="tabForm.regAddress" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="联络地址：" prop="telAddress">
                      <el-input v-model="tabForm.telAddress" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="法人代表：" prop="qyfr">
                      <el-input v-model="tabForm.qyfr" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="归属地区：" prop="gsAddress">
                      <el-cascader
                       class="lvwidth"
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                      </el-cascader>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="生产许可证：" prop="prodLic" >
                      <el-input v-model="tabForm.prodLic" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="种养殖许可证：" prop="breedLic" >
                      <el-input v-model="tabForm.breedLic" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="18" :offset="6">
              <el-form-item label="工商营业执照：" prop="businessLicense" >
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
              </el-col>
          </el-row>           
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item label="上链类型：" prop="upperType">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="i in checks" :label="i.name" :key="i.id" @change="handleCheckedChange(i)">{{i.name}}</el-checkbox>
                      </el-checkbox-group>
                      <div class="tips2">请根据业务情况,选择至少一条业务链加入</div>
                  </el-form-item>
                  <el-form-item class="upperdv">
                    
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="18" :offset="6">
                  <el-form-item>
                      <el-button type="" @click="cancel">取消</el-button>
                      <el-button type="primary" @click="saveOK">提交审核</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
          <!-- 企业信息end -->
        <div class="step3 " v-show="isShow == 2">  
          <el-row type="flex" justify="center">
                <img class="subimg" src="../../assets/img/subtip.png"/>
          </el-row>
          <el-row type="flex" justify="center">
              <div class="subdv">你的企业信息已提交,请等待审核</div>
          </el-row>
          <el-row type="flex" justify="center">
              <div class="subtip pint">
                审核时间为3-5个工作日，请谨记您的账号。<br/> 
                在审核完成后，您将可以使用该账号作为企业管理员进行登录。<br/> 
                如果您有任何疑问，欢迎随时联系我们，我们会第一时间帮您解决。</div>
          </el-row>
          <el-row type="flex" justify="center">
               <div class="subend">
                 <el-button type="primary" @click="sureOk">确定</el-button>
               </div>
          </el-row>
        </div>
          <!-- 提交审核end -->
          
      </el-form>
  </div>
    </div>  
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { regionData } from 'element-china-area-data'
import api from '@/feath/api.js'
import {complaintUploadUrl, baseURL} from '@/feath/server/http.js'
  export default {
    data() {
      const qyNameFlag = (rule, value, callback) => {
      if (value === '') {
            return callback(new Error('请输入企业名称'));
          }
        var devn = /^[_A-Za-z0-9\-@.:_\u4e00-\u9f5a]{1,14}$/;
        if (!devn.test(value)) {
            callback(new Error('字母,数字或英文字符最长14位'));
        } else {
            callback();
        }
    };
     const prodLicBlur = (rule, value, callback) => {
        if (!(/^[^\u4e00-\u9fa5]+$/.test(value))) {
          callback(new Error('请输入正确的生成许可证!'));
        } else {
          callback();
        }
      };
      const breedLicBlur = (rule, value, callback) => {
        if (!(/^[^\u4e00-\u9fa5]+$/.test(value))) {
          callback(new Error('请输入正确的种养殖许可证!'));
        } else {
          callback();
        }
      };
    // 请输入18位统一社会信用代码
    const qycode = (rule, value, callback) => {
      if (value === '') {
            return callback(new Error('请输入18位统一社会信用编码'));
          }
        var devn = /^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$/;
        if (!devn.test(value)) {
          callback(new Error('不是有效的统一社会信用编码！'));
        }else{
          this.checkCode(callback);
        }
    };
    return {
        id:'',
        active: 0,
        checked:true,
        isShow:1,
        options: regionData,
        selectedOptions: [],
        checkList: [],
        imageUrl: '',
        imageUrl2: '',
        tempUrl: '',
        uploadUrl: complaintUploadUrl,
        customHeaders: {
          'identity-authentic-request-header': localStorage.getItem('access_token'),
        },
        checks:[
          {id:'1',name:'产地链'},
          {id:'2',name:'加工链'},
          {id:'3',name:'物流链'},
          {id:'4',name:'销售链'}
        ],
        checks2:{'产地链':4,'加工链':3,'物流链':2,'销售链':1},
        tabForm: {
          qyName: '',
          qyNumber: '',
          regAddress: '',
          telAddress: '',
          qyfr: '',
          gsAddress: '',
          prodLic: '' ,         
          breedLic: '' ,         
          busineLic: '' ,         
          upperType: ''         
        },
        ruleValidate: {
          qyName: [{ required: true, validator: qyNameFlag, trigger: 'blur' }],
          qyNumber: [{ required: true, validator: qycode, trigger: 'blur' }],
          regAddress: [{ required: true, message: '注册地址不能为空', trigger: 'blur' }],
          telAddress: [{ required: true, message: '联络地址不能为空', trigger: 'blur' }],   
          qyfr: [{ required: true, message: '法人代表不能为空', trigger: 'blur' }],	
          gsAddress: [{ required: true, message: '归属地区不能为空', trigger: 'blur' }],
          prodLic: [{ required: true, validator: prodLicBlur, trigger: 'blur' }],		
          breedLic: [{ required: true, validator: breedLicBlur, trigger: 'blur' }],   
          busineLic: [{ required: true, message: '工商营业执照图片地址不能为空', trigger: 'blur' }],
          upperType: [{ required: true, message: '上链类型不能为空', trigger: 'blur' }],
          businessLicense: [
            { required: true, message: '请上传工商营业执照', trigger: 'blur' },
          ],
          upperType: [
            { required: true, message: '请至少选择一条业务链', trigger: 'blur' }
          ],
        },
      };
    },
    components: {
      
    },
    mounted () {
      this.id = Number(this.$route.query.id);
      this.orgDetail();
      
    },
    methods: {
      orgDetail () {
        let data = {
          id: this.id
        }
        api.getOrgDetail(data).then(res => {
          console.log(res)
          if (res.code == 0) {
            this.tabForm.qyName = res.result.name;
            this.tabForm.qyNumber = res.result.creditCode;
            this.tabForm.regAddress = res.result.registerAddress;
            this.tabForm.telAddress = res.result.contactAddress;
            this.tabForm.qyfr = res.result.corporate;
            this.selectedOptions = res.result.attributionArea.split(','); // 字符串转数组，
            this.tabForm.prodLic = res.result.plantLicence;
            this.tabForm.breedLic = res.result.productLicence;
            this.checkList = res.result.applyChain.split('/');
            this.imageUrl = baseURL + res.result.businessLicense;
            this.tempUrl = res.result.businessLicense;
          }
         
        })
      },
      cancel(){
        let oUrl = '/unaudited';
        this.$router.push({
          path: oUrl
        })
      },
       checkCode(callback){
        let data = {
          id: this.id,
          creditCode: this.tabForm.qyNumber,
        }
         api.checkCode(data).then(res => {
          if (res.code == 4) {
            callback(new Error('该社会统一信用代码已被注册'));
          } else {
            callback();
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
      saveOK () {
        if(this.selectedOptions){
          this.tabForm.gsAddress = this.selectedOptions.join();
        }
        if(this.checkList){
          this.tabForm.applyChain = this.checkList.map(v => {
                 return v;
              }).join("/");
          this.tabForm.chainIds = this.checkList.map(v => {
                 return this.checks2[v];
              })
        }
        let data = {
          id:this.id,
          name: this.tabForm.qyName,
          creditCode: this.tabForm.qyNumber,
          registerAddress: this.tabForm.regAddress,
          contactAddress: this.tabForm.telAddress,   
          corporate: this.tabForm.qyfr,	
          attributionArea: this.tabForm.gsAddress,
          plantLicence: this.tabForm.prodLic,		
          productLicence: this.tabForm.breedLic,   
          businessLicense: 'img/stepimg.png',  
          applyChain:this.tabForm.applyChain,
          chainIds: this.tabForm.chainIds,	
        }
        if(this.imageUrl){
          data.businessLicense = this.tempUrl;
        }
        if(this.imageUrl2){
            data.businessLicense = this.imageUrl2;
          }
        console.log(data)
          
        api.reregister(data).then(res => {
          if (res.code == 0) {
              this.isShow = 2;
            if (res.result.token) {
              let oUrl = '/'
              this.$router.push({
                path: oUrl
              })
            }
          } else {
            this.$message.error(res.msg);
          }
        
        })
      },
      sureOk(){
        let oUrl = '/unaudited'
        this.$router.push({
          path: oUrl
        })
      },
      // 省市区
      handleChange (value) {
        console.log(value)
        this.tabForm.gsAddress = value.join();
      },
      // 上链类型
      handleCheckedChange(item){
        this.tabForm.applyChain = this.checkList.map(v => {
                 return v;
              }).join("/");
        this.tabForm.chainIds = this.checkList.map(v => {
                 //console.log("v=="+v);
                 return this.checks2[v];
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
    font-weight:400;
    color:rgba(137,137,137,1);
    line-height:20px;
    text-align: left;
  }
  .subimg{
    width: 60px;
    height: 60px;
    margin-top: 61px;
  }
   .subdv{
    width:425px;
    height:36px;
    font-size:25px;
    font-weight:400;
    color:rgba(81,76,74,1);
    line-height:36px;
    margin-top: 40px;
  }
  .pint{
    text-indent:26px;
  }
  .subtip{
    width:450px;
    height:63px;
    font-size:15px;
    font-weight:400;
    color:rgba(137,137,137,1);
    line-height:21px;
    margin-top: 10px;
    margin-left: 30px;
    
    }
  .lvwidth {
      width: 302px;
  }
  .tips2{
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(184,184,184,1);
    line-height:20px;
  }
  .subend{
    margin-top: 40px;
  }
  .stepBox{
  height: 48px;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #fff;
  line-height: 54px;
  margin: 40px 118px;
  display: flex;
}
.stepBox span{
  flex: 1;
  text-align: center;
  color: #000000;
  font-size: 18px;
  height: 54px;
  position: relative;
  background: #EDEFF4;
}
.stepBox .stepActive{
  background: #38ADFF;
  color: #fff;
}
.gray_arrow{
  width: 36px;
  height: 54px;
  display: inline-block;
  position: absolute;
  right: -36px;
  top: 0px;
  background: url('../../assets/img/arrow.png') no-repeat;
  background-size: contain;
  z-index: 1;
}
.gray_arrow:before{
  content: '';
  width:0; 
  height:0; 
  position: absolute;
  left: 0px;
  border-top:27px solid transparent;
  border-bottom: 27px solid transparent;
  border-left: 28px solid #EDEFF4;
}
.blue_arrow{
  width: 36px;
  height: 54px;
  display: inline-block;
  position: absolute;
  right: -36px;
  top: 0px;
  background: url('../../assets/img/arrow.png') no-repeat;
  background-size: contain;
  z-index: 1;
}
.blue_arrow:before{
  content: '';
  width:0; 
  height:0; 
  position: absolute;
  left: 0px;
  border-top:27px solid transparent;
  border-bottom: 27px solid transparent;
  border-left: 27px solid #38ADFF;
}
</style>
