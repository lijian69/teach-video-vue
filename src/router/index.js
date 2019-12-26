import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Index from '@/components/Index.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/index', name: 'Index', component: Index }
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
