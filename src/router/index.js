import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
let aside = [
  {
    path: '/',
    name: 'Index',
    title: '概览',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: false }
  },
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计报表',
    component: () => import('../views/statistics'),
    meta: { requireAuth: false }
  },
  {
    path: '/account',
    name: 'account',
    title: '用户管理',
    component: () => import('../views/account'),
    meta: { requireAuth: false }
  }
]
let router = new VueRouter({
  mode: 'hash',
  routes: [
    ...aside
  ]
})

router.beforeEach((to, from, next) => {
  // 页面title更替，若不需要可注释
  // document.title = to.meta.title
  console.log(to)
  next()
  // 判断该路由是否需要登录权限
  // if (to.meta.requireAuth) {
  //   // 判断是否是登录状态
  //   if (Cookies.get('isLogin') === '1') {
  //     next()
  //   } else {
  //     // 否则跳回登录页
  //     next('/signin')
  //   }
  // } else {
  //   // 如果不需要登录权限，就直接resolve这个钩子
  //   next()
  // }
})
export {router,aside}