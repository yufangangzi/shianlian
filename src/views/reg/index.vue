<template>
  
  <div class="regdemo">
    <el-container>
      <el-header>
        <header-menu></header-menu>
      </el-header>
      <div class="layot">
      <el-form ref="tabForm" :model.sync="tabForm" :rules.sync="rules" label-width="150px"  :inline-message="true" :key="isShow">
          <div class="stepBox">
            <span class="step1" :class="{'stepActive':isShow == 1}">
              1.账户信息
              <a :class="[isShow==1 ? 'blue_arrow' : 'gray_arrow' ]"></a>
            </span>
            <span class="step2" :class="{'stepActive':isShow == 2}">
              2.企业信息
              <a :class="[isShow==2 ? 'blue_arrow' : 'gray_arrow' ]"></a>
            </span>
            <span class="step3" :class="{'stepActive':isShow == 3}">
              3.提交审核
            </span>
          </div>
          <!-- <el-steps :active="active" simple class="step">
            <el-step title="1账户信息" icon="none"></el-step>
            <el-step title="2企业信息" icon="none"></el-step>
            <el-step title="3提交审核" icon="none"></el-step>
          </el-steps> -->
          <!-- 头部step -->
        <div class="step1" v-if="isShow == 1">
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="用户名：" prop="name" >
                      <el-input v-model="tabForm.name" size="small" class="lvwidth"></el-input>
                  </el-form-item>
                  <div class="tips1">字母、数字或者英文符号,最长14位</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="密码：" prop="password" >
                      <el-input v-model="tabForm.password" size="small" class="lvwidth" type="password"></el-input>
                  </el-form-item>
                  <div class="tips1">密码必须包含数字、大小写字母、长度不低于8位</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="确认密码：" prop="password2" >
                      <el-input v-model="tabForm.password2" size="small" class="lvwidth" type="password"></el-input>
                  </el-form-item>
                  <div class="tips1">请再次输入密码</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="手机号码：" prop="tel" >
                      <el-input v-model="tabForm.tel" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="邮箱：" prop="email" >
                      <el-input v-model="tabForm.email" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
              <el-form-item >
                <el-checkbox v-model="checked">同意食安物链隐私协议</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item>
                      <el-button type="primary" :disabled="!checked"  @click="submitForm('tabForm')">下一步</el-button>
                      <!-- <el-button type="primary" @click="reback">返回首页</el-button> -->
                      <!-- <el-button type="primary" @click="submit">注册</el-button> -->
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
          <!-- 账户信息end -->
        <div class="step2" v-if="isShow == 2">
        <!-- <div> -->
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="企业名称：" prop="qyName" >
                      <el-input v-model="tabForm.qyName" size="small" class="lvwidth"></el-input>

                  </el-form-item>
                  <div class="tips1">请输入6-18位英文字母，数字组合</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="统一社会信用代码：" prop="qyNumber" >
                      <el-input v-model="tabForm.qyNumber" size="small" class="lvwidth"></el-input>
                  </el-form-item>
                  <div class="tips1">请输入18位统一社会信用代码</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="注册地址：" prop="regAddress" >
                      <el-input v-model="tabForm.regAddress" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="联络地址：" prop="telAddress" >
                      <el-input v-model="tabForm.telAddress" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="法人代表：" prop="qyfr" >
                      <el-input v-model="tabForm.qyfr" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="归属地区：" prop="gsAddress" >
                      <el-cascader
                        class="lvwidth"
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                      </el-cascader>

                      <el-input v-model="tabForm.gsAddress" size="small" class="lvwidth" style="display: none;"></el-input>
                  </el-form-item>
                  <div class="tips1">省/市/县</div>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="生产许可证：" prop="prodLic" >
                      <el-input v-model="tabForm.prodLic" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="种养殖许可证：" prop="breedLic" >
                      <el-input v-model="tabForm.breedLic" size="small" class="lvwidth"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>

          <el-row>
            <el-col :span="18" :offset="6">
              <el-form-item label="工商营业执照：" prop="businessLicense">
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
                      原件、扫描件或者加盖公章的复印件，内容真实有效，不得做任何修改。<br>
                      支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。
                    </div>
                    <el-button size="small" type="primary">点击上传</el-button>
                  </div>
                </el-upload>
                <el-input v-model="tabForm.businessLicense" size="small" class="lvwidth" style="display: none;"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item label="上链类型：" prop="applyChain" >
                      <el-checkbox-group v-model="tabForm.applyChain">
                        <el-checkbox label="产地链"></el-checkbox>
                        <el-checkbox label="加工链"></el-checkbox>
                        <el-checkbox label="物流链"></el-checkbox>
                        <el-checkbox label="销售链"></el-checkbox>
                      </el-checkbox-group>
                  <!-- </el-form-item>
                  <el-form-item class="upperdv"> -->
                    <div class="tips2">请根据业务情况,选择至少一条业务链加入</div>
                  </el-form-item>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item>
                      <el-button type="success" @click="preClick">上一步</el-button>
                      <el-button type="primary" @click="submitForm('tabForm')">下一步</el-button>
                      <!-- <el-button type="primary" @click="reback">返回首页</el-button> -->
                      <!-- <el-button type="primary" @click="submit">注册</el-button> -->
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
          <!-- 企业信息end -->
        <!-- <div class="uhide"> -->
        <div class="step3 " v-if="isShow == 3">  
          <el-row type="flex" justify="center">
                <img class="subimg" src="../../assets/img/subtip.png"/>
          </el-row>
          <el-row type="flex" justify="center">
              <div class="subdv">你的企业信息已提交,请等待审核</div>
          </el-row>
          <el-row type="flex" justify="center">
              <div class="subtip">
                审核时间为3-5个工作日，请谨记您的账号。<br/> 
                在审核完成后，您将可以使用该账号作为企业管理员进行登录。<br/> 
                如果您有任何疑问，欢迎随时联系我们，我们会第一时间帮您解决。</div>
          </el-row>
          <el-row type="flex" justify="center">
               <div class="subend">
                 <el-button type="primary" @click="reback">返回首页</el-button>
               </div>
          </el-row>
        </div>
          <!-- 提交审核end -->
        <div class="step4" v-if="isShow == 4">  
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item >
                      <img class="subimg" src="../../assets/img/subtip.png"/>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="18" :offset="6">
                  <el-form-item >
                    <div class="subdv">恭喜您，审核通过！</div>
                    <div class="subtip">返回首页，快去登录吧</div>
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
        <!-- 审核通过end -->
          
      </el-form>
    </div>
    </el-container>     
  </div>
  
</template>

<script>
import Cookies from 'js-cookie'
import { regionData } from 'element-china-area-data'
import api from '@/feath/api.js'
import {complaintUploadUrl2} from '@/feath/server/http.js'
import HeaderMenu from '../../common/header-menu-for-reg.vue'
export default {
  data () {
    var nameBlur = (rule, value, callback) =>{
      if (value === '') {
          return callback(new Error('请输入用户名'));
        }
      var devn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (!devn.test(value)) {
        callback(new Error('请输入6-18位英文字母，数字组合'));
      }else{
        // callback();
        this.checkName(callback);
      }
    };
     var passWordBlur = (rule, value, callback) =>{
      if (value === '') {
          return callback(new Error('请输入注册密码'));
        }
      var devn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
      if (!devn.test(value)) {
        callback(new Error('请输入6-18位英文字母，数字组合'));
      }else{
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.tabForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateTel = (rule, value, callback) => {
        if (!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码!'));
        } else {
          callback();
        }
      };

      var validateEmail = (rule, value, callback) => {
        if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value))) {
          callback(new Error('请输入正确的邮箱!'));
        } else {
          callback();
        }
      };

      var validateGSD = (rule, value, callback) => {
        debugger;
        if (value.length<1) {
          callback(new Error('归属地区不能为空!'));
        } else {
          callback();
        }
      };
    // 请输入18位统一社会信用代码
    const qycode = (rule, value, callback) => {
      if (value === '') {
            return callback(new Error('请输入18位统一社会信用代码'));
          }
        var devn = /^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$/;
        
        if (!devn.test(value)) {
          callback(new Error('不是有效的统一社会信用代码！'));
        }else{
          // callback();
          this.checkCode(callback);
          
        }
    };
    return {
      id:'',
      active: 0,
      checked:true,
       // checkList: ['产业链',],
       isShow: 0,
       options: regionData,
       selectedOptions: [],
      imageUrl: '',
      imageUrl2: '',
      uploadUrl: complaintUploadUrl2,
      customHeaders: {
        'identity-authentic-request-header': localStorage.getItem('access_token'),
      },

      tabForm: {
        name: '',
        password: '',
        password2: '',
        tel: '',
        email: '',

        qyName: '',
        qyNumber: '',
        regAddress: '',
        telAddress: '',
        qyfr: '',
        gsAddress: '',
        prodLic: '',
        breedLic: '',
        businessLicense: '',
        applyChain: ['产地链'],
          
      },

      rules: {
        
      },
      rules1: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            // { min: 3, max: 14, message: '请填写正确的用户名', trigger: 'blur' }
            { validator: nameBlur, trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { min: 8, max: 24, message: '请按照提示输入密码', trigger: 'blur' },
            { validator: passWordBlur, trigger: 'blur' },
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            // { min: 8, max: 24, message: '请按照提示输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'blur' },
            { validator: validateTel, trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            
            { validator: validateEmail, trigger: 'blur' },
          ],


          // chain: [
          //   { required: true, message: '请选择业务链', trigger: 'change' }
          // ],
      },

      rules2: {
          qyName: [
            { required: true, message: '请填写企业名称', trigger: 'blur' },
            // { min: 3, max: 14, message: '请填写正确的用户名', trigger: 'blur' }
          ],
          qyNumber: [
            { required: true, message: '请输入18位统一社会信用代码', trigger: 'blur' },
            { validator: qycode, trigger: 'blur' },
          ],
          regAddress: [
            { required: true, message: '注册地址不能为空', trigger: 'blur' },
            
            // { validator: validatePass2, trigger: 'blur' },
          ],
          telAddress: [
            { required: true, message: '联络地址不能为空', trigger: 'blur' },
            
            // { validator: validatePass2, trigger: 'blur' },
          ],
          qyfr: [
            { required: true, message: '法人代表不能为空', trigger: 'blur' },
            
            // { validator: validatePass2, trigger: 'blur' },
          ],
          gsAddress: [
            { required: true, message: '归属地区不能为空', trigger: 'blur' },
            
            // { validator: validateGSD, trigger: 'blur' },
          ],
          prodLic: [
            { required: true, message: '生产许可证不能为空', trigger: 'blur' },
            
            // { validator: validatePass2, trigger: 'blur' },
          ],
          breedLic: [
            { required: true, message: '种养殖许可证不能为空', trigger: 'blur' },
            
            // { validator: validatePass2, trigger: 'blur' },
          ],
          businessLicense: [
            { required: true, message: '请上传工商营业执照', trigger: 'blur' },
            // { validator: validatePass2, trigger: 'blur' },
          ],
          applyChain: [
            { required: true, message: '请至少选择一条业务链', trigger: 'blur' }
          ],

          


          // chain: [
          //   { required: true, message: '请选择业务链', trigger: 'change' }
          // ],

        

      },
      

      nameError: '',
      passWordError: '',
      passsave: false
    }
  },
  components: {
    HeaderMenu
  },
  mounted (){
    this.rules = this.rules1;
    this.isShow = 1;

    this.tabForm = {
        name: 'chang123',
        password: 'admin123',
        password2: 'admin123',
        tel: '15811599822',
        email: '158991@qq.com',

        qyName: '北京安捷乐',
        // qyNumber: '92330783MA29QJ0F5X',
        qyNumber: '',
        regAddress: '大连靠山屯',
        telAddress: '大连广发',
        qyfr: '尼古拉赵四哥',
        gsAddress: '',
        prodLic: '许可有效S3204034',
        breedLic: 'NS300323042',
        businessLicense: '',
        applyChain: ['产地链'],
      }

    // this.rules = this.rules2;
    // this.isShow = 2;

    // this.rules = {};
    // this.isShow = 3;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // debugger
        if (valid) {
          // alert('submit!');
          if(this.isShow===1){
            this.rules = this.rules2;
            this.isShow++;
            this.active++;
          }else{
            this.submit();
            // this.isShow++;
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    
    preClick(){
      this.rules = {};
      if(this.isShow===3){
        this.rules = this.rules2;

      }
      if(this.isShow===2){
        this.rules = this.rules1;
        
      }
      this.isShow--;
      this.active--;
    },
    handleAvatarSuccess(res, file) {
        // debugger;
        if(res.code===0 && res.result){
          this.imageUrl = URL.createObjectURL(file.raw);
          this.imageUrl2 = res.result;
          this.tabForm.businessLicense = res.result;
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
   submit () {
        let data = {
          userName: this.tabForm.name,
          password: this.tabForm.password,
          repassword: this.tabForm.password2,
          telephone: this.tabForm.tel,
          email: this.tabForm.email,

          name: this.tabForm.qyName,
          creditCode: this.tabForm.qyNumber,
          registerAddress: this.tabForm.regAddress,
          contactAddress: this.tabForm.telAddress,   
          corporate: this.tabForm.qyfr,	
          attributionArea: this.tabForm.gsAddress,
          plantLicence: this.tabForm.prodLic,		
          productLicence: this.tabForm.breedLic,   
          businessLicense: this.tabForm.businessLicense, 
          applyChain: [],
          chainIds:this.tabForm.applyChain  		
        }
        // debugger;
        data.chainIds = this.tabForm.applyChain.map((v) => {
          return {"销售链":1,"物流链":2,"加工链":3,"产地链":4}[v];
        })
        data.applyChain = this.tabForm.applyChain.join('/');
        data.attributionArea = this.selectedOptions.join(',');
        // debugger;
        console.log(JSON.stringify(data));
        // return;
        api.register(data).then(res => {
          // debugger;
          if (res.code == 0) {
            // if (res.result.token) {
              
              this.isShow++;
              this.active++;
            // }
          } else {
            this.$message.error(res.msg);
          }
        
        })
      },
      checkName(callback){
        let data = {
          userName:this.tabForm.name
        }
         api.checkCode(data).then(res => {
          if (res.code == 4) {
              callback(new Error('该用户已存在'));             
          } else {
            callback(); 
            // if(this.tabForm.name == res.result.userName){
              //  callback(new Error('该用户已存在'));
              // }
          }
        
        })
      },
      checkCode(callback){
        let data = {
          creditCode: this.tabForm.qyNumber,
        }
         api.checkCode(data).then(res => {
          if (res.code == 0) {
             callback();
          } else {
            if(res.result){
              if(this.tabForm.qyNumber == res.result.creditCode){
               callback(new Error('该社会统一信用代码已被注册'));
              }
            }
          }
        
        })
      },
  reback(){
    this.$router.replace('/login')
  },
  handleChange (value) {
    console.log(value)
    this.tabForm.gsAddress = value.join(',')
    // debugger
  }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/reg.less';

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
.tips1{
  height:20px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(162,162,162,1);
  line-height:20px;
  margin-left: 150px;
  margin-top: -20px;
  margin-bottom: 2px;
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