import Vue from 'vue'
import Router from 'vue-router'
/**/
import Start from '@/components/Start'



Vue.use(Router)

const router = new Router({
  routes: [
    /**/
    { path: '/', redirect: '/start' },
    { path: '/start', name: 'start', component: Start },

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
