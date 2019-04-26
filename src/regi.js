import Vue from 'vue';
import Regi from './Regi.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.less'
Vue.use(ElementUI);
new Vue({
  el: '#reg',
  render: h => h(Regi),
});