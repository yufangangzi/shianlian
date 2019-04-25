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
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="工商营业执照：" prop="busineLic" label-width="110px">
                   <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">请上传最新的营业执照。
                          格式要求：原件照片、扫描件或者加盖公章的复印件，
                          支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。
                      </div> -->
                    </el-upload>    
                  </el-form-item>
              </el-col>
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
export default {
  data () {
    return {
      active: 0,
      checked:true,
       checkList: ['产业链',],
       isShow:1,
       options: regionData,
       selectedOptions: [],
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
  submit () {
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