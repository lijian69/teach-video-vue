import Vue from 'vue'
import Router from 'vue-router'
/**/
import Start from '../components/Start'
import Home from "../components/home/Home";
import MoocHome from "../components/mooc/MoocHome";
import MoocDetail from '../components/video/MoocDetail'
import User from '../components/user/User'

import Login from '../components/Login'


Vue.use(Router)

const router = new Router({
  routes: [
    /**/
    { path: '/', redirect: '/start' },
    { path: '/start', name: 'start', component: Start, redirect:'/home',children: [
        { path: '/home', name: 'home', component: Home },
        { path: '/moochome', name: 'moochome', component: MoocHome },
        { path: '/moocdetail', name: 'MoocDetail', component: MoocDetail },
        { path: '/user', name: 'User', component: User },
      ]
    },
    { path: '/login', name: 'login', component: Login,},

  ]
})

//路由导航守卫
/*router.beforeEach(((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  } else {
    next()
  }
}))*/

export default router
