<template>
  <div class="details">
    <div class="gailan">概览/企业审核</div>
    <div class="detailBox">
      <div class="top-bar">企业信息</div>
      <div class="regdemo">
      <el-form ref="form" :model="tabForm" label-width="100px" :rules="ruleValidate">
          <el-steps :active="active" simple class="step">
            <el-step title="1企业信息" icon="none"></el-step>
            <el-step title="2提交审核" icon="none"></el-step>
          </el-steps>
          <!-- 头部step -->
          <!-- 账户信息end -->
        <div class="step2" v-show="isShow == 1">
        <!-- <div> -->
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="企业名称："  placeholder="请输入企业名称"  prop="qyName">
                      <el-input v-model="tabForm.qyName" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="统一社会信用代码：" prop="qyNumber" label-width="150px">
                      <el-input v-model="tabForm.qyNumber" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="注册地址：" prop="regAddress">
                      <el-input v-model="tabForm.regAddress" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="联络地址：" prop="telAddress">
                      <el-input v-model="tabForm.telAddress" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="法人代表：" prop="qyfr">
                      <el-input v-model="tabForm.qyfr" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="归属地区：" prop="gsAddress">
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
                  <el-form-item label="生产许可证：" prop="prodLic" label-width="110px">
                      <el-input v-model="tabForm.prodLic" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="种养殖许可证：" prop="breedLic" label-width="130px">
                      <el-input v-model="tabForm.breedLice" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="工商营业执照：" prop="busineLic" label-width="130px">
                   <el-upload>
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>    
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="10">
                  <el-form-item label="上链类型：" prop="upperType">
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
        <div class="step3 " v-show="isShow == 2">  
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
        <div class="step4" v-show="isShow == 3">  
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
              <el-col :span="8">
                  <el-form-item>
                      <el-button type="" @click="cancel">取消</el-button>
                      <el-button type="primary" @click="submit">提交审核</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
      </el-form>
  </div>
    </div>  
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { regionData } from 'element-china-area-data'
import api from '@/feath/api.js'
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
    // 请输入18位统一社会信用代码
    const CheckSocialCreditCode = (Code) => {
      var patrn = /^[0-9A-Z]+$/;
      //18位校验及大写校验
      if ((Code.length != 18) || (patrn.test(Code) == false)) {
        console.info("不是有效的统一社会信用编码！");
        return false;
      }
      else {
        var Ancode;//统一社会信用代码的每一个值
        var Ancodevalue;//统一社会信用代码每一个值的权重 
        var total = 0;
        var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
        var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
        //不用I、O、S、V、Z 
        for (var i = 0; i < Code.length - 1; i++) {
          Ancode = Code.substring(i, i + 1);
          Ancodevalue = str.indexOf(Ancode);
          total = total + Ancodevalue * weightedfactors[i];
          //权重与加权因子相乘之和 
        }
        var logiccheckcode = 31 - total % 31;
        if (logiccheckcode == 31) {
          logiccheckcode = 0;
        }
        var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
        var Array_Str = Str.split(',');
        logiccheckcode = Array_Str[logiccheckcode];
        var checkcode = Code.substring(17, 18);
        if (logiccheckcode != checkcode) {
          console.info("不是有效的统一社会信用编码！");
          return false;
        }else{
          console.info("yes");
        }
        return true;
       }
    　}
      return {
        active: 0,
        checked:true,
        checkList: ['产业链',],
        isShow:1,
        options: regionData,
        selectedOptions: [],
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
          qyNumber: [{ required: true, message: CheckSocialCreditCode, trigger: 'blur' }],
          regAddress: [{ required: true, message: '注册地址不能为空', trigger: 'blur' }],
          telAddress: [{ required: true, message: '联络地址不能为空', trigger: 'blur' }],   
          qyfr: [{ required: true, message: '法人代表不能为空', trigger: 'blur' }],	
          gsAddress: [{ required: true, message: '归属地区不能为空', trigger: 'blur' }],
          prodLic: [{ required: true, message: '生产许可证不能为空', trigger: 'blur' }],		
          breedLic: [{ required: true, message: '种养值许可证不能为空', trigger: 'blur' }],   
          busineLic: [{ required: true, message: '工商营业执照图片地址不能为空', trigger: 'blur' }],
          upperType: [{ required: true, message: '上链类型不能为空', trigger: 'blur' }],
        },
      };
    },
    components: {
      
    },
    methods: {
      cancel(){
        
      },
      submit () {
        let data = {
          creditCode: this.tabForm.qyNumber,
          registerAddress: this.tabForm.regAddress,
          contactAddress: this.tabForm.telAddress,   
          corporate: this.tabForm.qyfr,	
          attributionArea: this.tabForm.gsAddress,
          plantLicence: this.tabForm.prodLic,		
          productLicence: this.tabForm.breedLic,   
          businessLicense: this.tabForm.busineLic, // img/stepimg.png 
          applyChain: this.tabForm.upperType	
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
      // 通过审核
      handleChange (value) {
        console.log(value)
      },
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

</style>
