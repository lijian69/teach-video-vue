import Vue from 'vue'
import App from './App'
import router from './router'
//引入axios 访问方法
import httpApi from '@/api/http'
import axios from 'axios'
import Print from './plugs/print'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import VueApexCharts from 'vue-apexcharts'
// 导入全局样式表
import './assets/css/global.css'

Vue.config.devtools = true;
axios.defaults.baseURL = '/api';
// token值添加到request Header 中
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
});

Vue.config.productionTip = false;
Vue.component('apexchart', VueApexCharts);
Vue.use(VueApexCharts);
Vue.use(Print);
Vue.use(httpApi);
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
