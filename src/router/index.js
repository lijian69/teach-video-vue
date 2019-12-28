import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Index from '@/components/Index.vue'
import Welcome from '@/components/Welcome.vue'
import Home from '@/components/view/home.vue'
import Goods from '@/components/view/Goods.vue'
import Company from '../components/view/Company'
import OutGoods from '../components/view/OutGoods'
import InGoods from '../components/view/InGoods'


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/index', name: 'Index', component: Index,redirect:'/welcome', children: [
        { path: '/welcome', name: 'Welcome', component: Welcome },
        { path: '/home', name: 'Home', component: Home },
        { path: '/goods', name: 'Goods', component: Goods },
        { path: '/company', name: 'Company', component: Company },
        { path: '/outgoods', name: 'OutGoods', component: OutGoods },
        { path: '/ingoods', name: 'InGoods', component: InGoods },
      ]
    }
  ]
})

//路由导航守卫
router.beforeEach(((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  } else {
    next()
  }
}))

export default router
