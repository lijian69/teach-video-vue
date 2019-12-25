import Vue from 'vue'
import App from './App'
import router from './router'
//引入axios 访问方法
import httpApi from '@/api/http'

Vue.config.productionTip = false
Vue.use(httpApi)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

