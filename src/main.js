import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.less'
import {router} from '@/router/index.js'
import VueClipboard from 'vue-clipboard2'
import VueBus from 'vue-bus';
Vue.use(VueBus);
Vue.use(VueClipboard)
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});