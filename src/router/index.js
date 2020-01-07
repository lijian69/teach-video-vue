import Vue from 'vue'
import Router from 'vue-router'
/**/
import Login from '@/components/Login'
import Index from '@/components/Index'
import Goods from '@/components/view/Goods'
import Company from '../components/view/Company'
import OutGoods from '../components/view/OutGoods'
import InGoods from '../components/view/InGoods'
import Bill from "../components/Bill";
import home from "../components/view/home"
import statistics from "../components/view/statistics";
import Role from "../components/power/Role";
import Permission from "../components/power/Permission";


Vue.use(Router)

const router = new Router({
  routes: [
    /**/
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/index', name: 'Index', component: Index,redirect:'/home', children: [
        { path: '/home', name: 'home', component: home },
        { path: '/goods', name: 'Goods', component: Goods },
        { path: '/company', name: 'Company', component: Company },
        { path: '/outgoods', name: 'OutGoods', component: OutGoods },
        { path: '/ingoods', name: 'InGoods', component: InGoods },
        { path: '/bill',name:'Bill',component:Bill},
        { path: '/statistics',name:'statistics',component:statistics},
        { path: '/role',name:'role',component:Role},
        { path: '/permission',name:'permission',component:Permission},
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
