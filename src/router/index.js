import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import Main from '../views/main.vue'
Vue.use(VueRouter)
let loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('../views/login'),
  meta: { requireAuth: false }
}
let aside = [
  {
    path: '/',
    name: 'Index',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: true, belongList: ['超管'] }
  },
  {
    path: '/overview',
    name: 'overview',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: true, belongList: ['企业'] }
  },
  {
    path: '/overview',
    name: 'overview',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: true, belongList: ['企业2'] }
  },
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计报表',
    iconclass: 'icon-1',
    component: () => import('../views/statistics'),
    meta: { requireAuth: true, belongList: ['超管', '企业'] }
  },
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计报表',
    iconclass: 'icon-1',
    component: () => import('../views/statistics'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['企业2'] }
  },
  {
    path: '/business',
    name: 'business',
    title: '业务链管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['超管'] }
  },
  {
    path: '/datachain',
    name: 'datachain',
    title: '数据上链',
    iconclass: 'icon-2',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: true, belongList: ['企业'] }
  },
  {
    path: '/datachain',
    name: 'datachain',
    title: '数据上链',
    iconclass: 'icon-2',
    component: () => import('../views/index/index.vue'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['企业2'] }
  },
  {
    path: '/account',
    name: 'account',
    title: '用户管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    meta: { requireAuth: true, belongList: ['超管', '企业'] }
  },
  {
    path: '/account',
    name: 'account',
    title: '用户管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['企业2'] }
  },
  
]
const appRouter = [
  {
    path: '/',
    name: 'zhuye',
    title: 'main',
    component: Main,
    children:  [...aside]
  },
]
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
const otherRouter = [
  {
    path: '/',
    name: 'zhuye',
    title: 'main',
    component: Main,
    children:  [
      {
        path: '/account-2',
        name: 'account2',
        title: '用户管理新增',
        iconclass: 'icon-2',
        component: () => import('../views/account'),
        meta: { requireAuth: true }
      },
    ]
  },
]
let router = new VueRouter({
  mode: 'hash',
  routes: [
    loginRouter,
    ...appRouter,
    ...otherRouter,
  ]
})

router.beforeEach((to, from, next) => {
  // 页面title更替，若不需要可注释
  // document.title = to.meta.title
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断是否是登录状态
    if (Cookies.get('food_isLogin') === '1') {
      next()
    } else {
      // 否则跳回登录页
      next('/login')
    }
  } else {
    // 如果不需要登录权限，就直接resolve这个钩子
    next()
  }
})
export {router,aside}
