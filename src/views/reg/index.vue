<template>
  <div class="regdemo">
      <el-form ref="form" :model="tabForm" label-width="50px">
          <el-steps :active="active" simple class="step">
            <el-step title="1账户信息" icon="none"></el-step>
            <el-step title="2企业信息" icon="none"></el-step>
            <el-step title="3提交审核" icon="none"></el-step>
          </el-steps>
          <!-- 头部step -->
        <div class="step1" v-show="isShow == 1">
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="用户名：" prop="name" label-width="100px">
                      <el-input v-model="tabForm.name" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="密码：" prop="password" label-width="100px">
                      <el-input v-model="tabForm.password" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="确认密码：" prop="password2" label-width="100px">
                      <el-input v-model="tabForm.password2" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="手机号码：" prop="tel" label-width="100px">
                      <el-input v-model="tabForm.tel" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="邮箱：" prop="email" label-width="100px">
                      <el-input v-model="tabForm.email" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-form-item >
                <el-checkbox v-model="checked">同意食安物链隐私协议</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
          <!-- 账户信息end -->
        <div class="step2" v-show="isShow == 2">
        <!-- <div> -->
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="企业名称：" prop="qyName" label-width="100px">
                      <el-input v-model="tabForm.qyName" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="统一社会信用代码：" prop="qyNumber" label-width="140px">
                      <el-input v-model="tabForm.qyNumber" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="注册地址：" prop="regAddress" label-width="100px">
                      <el-input v-model="tabForm.regAddress" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="联络地址：" prop="telAddress" label-width="100px">
                      <el-input v-model="tabForm.telAddress" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="法人代表：" prop="qyfr" label-width="100px">
                      <el-input v-model="tabForm.qyfr" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="归属地区：" prop="gsAddress" label-width="100px">
                      <el-cascader
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                      </el-cascader>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="生产许可证：" prop="prodLic" label-width="100px">
                      <el-input v-model="tabForm.prodLic" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="种养殖许可证：" prop="breedLic" label-width="110px">
                      <el-input v-model="tabForm.breedLice" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
         <el-row type="flex" justify="center" label-width="260px">
                  <el-form-item label="工商营业执照：" prop="">
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
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="10">
                  <el-form-item label="上链类型：" prop="upperType" label-width="100px">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox label="产业链"></el-checkbox>
                        <el-checkbox label="加工链"></el-checkbox>
                        <el-checkbox label="物流链"></el-checkbox>
                        <el-checkbox label="销售链"></el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
                  <el-form-item class="upperdv">
                    <el-span>请根据业务情况,选择至少一条业务链加入</el-span>
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
          <!-- 企业信息end -->
        <!-- <div class="uhide"> -->
        <div class="step3 " v-show="isShow == 3">  
          <el-row type="flex" justify="center">
              <el-col :span="3">
                  <el-form-item >
                      <img class="subimg" src="../../assets/img/subtip.png"/>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item >
                    <div class="subdv">你的企业信息已提交,请等待审核</div>
                    <div class="subtip">审核时间为3-5个工作日，请谨记您的账号。 
                      在审核完成后，您将可以使用该账号作为企业管理员进行登录。 
                      如果您有任何疑问，欢迎随时联系我们，我们会第一时间帮您解决。</div>
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
          <!-- 提交审核end -->
        <div class="step4" v-show="isShow == 4">  
          <el-row type="flex" justify="center">
              <el-col :span="3">
                  <el-form-item >
                      <img class="subimg" src="../../assets/img/subtip.png"/>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item >
                    <div class="subdv">恭喜您，审核通过！</div>
                    <div class="subtip">返回首页，快去登录吧</div>
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
        <!-- 审核通过end -->
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item>
                      <el-button type="primary" @click="next">下一步</el-button>
                      <!-- <el-button type="primary" @click="reback">返回首页</el-button> -->
                      <!-- <el-button type="primary" @click="submit">注册</el-button> -->
                  </el-form-item>
              </el-col>
          </el-row>
      </el-form>
         
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { regionData } from 'element-china-area-data'
import api from '@/feath/api.js'
import {complaintUploadUrl} from '@/feath/server/http.js'
export default {
  data () {
    return {
      active: 0,
      checked:true,
       checkList: ['产业链',],
       isShow:1,
       options: regionData,
       selectedOptions: [],
      imageUrl: '',
      imageUrl2: '',
      uploadUrl: complaintUploadUrl,
      customHeaders: {
        'identity-authentic-request-header': localStorage.getItem('access_token'),
      },
      tabForm: {
        name: '',
        password: '',
        password2: '',
        tel: '',
        email: '',
      },
      nameError: '',
      passWordError: '',
      passsave: false
    }
  },
  methods: {
   next() {
    if (this.active++ > 2) this.active = 0;
     //step1 step2 step3 step4
     this.isShow++;
      
   },
   prev() {
     --this.active;
      if (this.active++ < 0) this.active = 0;
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
   submit () {
        let data = {
          userName: this.tabForm.name,
          password: this.tabForm.password,
          repassword: this.tabForm.repassword,
          telephone: this.tabForm.tel,
          email: this.tabForm.email,

          creditCode: this.tabForm.qyNumber,
          registerAddress: this.tabForm.regAddress,
          contactAddress: this.tabForm.telAddress,   
          corporate: this.tabForm.qyfr,	
          attributionArea: this.tabForm.gsAddress,
          plantLicence: this.tabForm.prodLic,		
          productLicence: this.tabForm.breedLic,   
          businessLicense: 'img/stepimg.png', 
          applyChain: './img/stepimg.png'		
        }
        if(this.imageUrl2){
            data.businessLicense = this.imageUrl2;
          }
        api.register(data).then(res => {
          if (res.code == 0) {
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
  reback(){

  },
  handleChange (value) {
    console.log(value)
  }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/reg.less';
</style>