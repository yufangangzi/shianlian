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
let regRouter = {
  path: '/register',
  name: 'register',
  component: () => import('../views/reg'),
  meta: { requireAuth: false }
}
let aside = [
  {
    path: '/',// 超级管理员路由
    name: 'Index',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/index.vue'),
    meta: { requireAuth: true, belongList: ['管理员'] }
  },
  {
    path: '/overview',// 已审核
    name: 'overview',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/overview.vue'),
    meta: { requireAuth: true, belongList: ['操作员'] }
  },
  {
    path: '/unaudited',// 未审核
    name: 'unaudited',
    title: '概览',
    iconclass: 'icon-0',
    component: () => import('../views/index/unaudited.vue'),
    meta: { requireAuth: true, belongList: ['运营者'] }
  },
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计报表',
    iconclass: 'icon-1',
    component: () => import('../views/statistics'),
    meta: { requireAuth: true, belongList: ['管理员', '操作员'] }
  },
  {
    path: '/statistics',
    name: 'statistics',
    title: '统计报表',
    iconclass: 'icon-1',
    component: () => import('../views/statistics'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['运营者'] }
  },
  {
    path: '/business',
    name: 'business',
    title: '业务链管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['管理员'] }
  },
  {
    path: '/datachain',
    name: 'datachain',
    title: '数据上链',
    iconclass: 'icon-3',
    component: () => import('../views/datachain/index.vue'),
    meta: { requireAuth: true, belongList: ['操作员'] }
  },
  {
    path: '/datachain',
    name: 'datachain',
    title: '数据上链',
    iconclass: 'icon-3',
    component: () => import('../views/datachain/index.vue'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['运营者'] }
  },
  {
    path: '/account',
    name: 'account',
    title: '用户管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    meta: { requireAuth: true, belongList: ['管理员', '操作员'] }
  },
  {
    path: '/account',
    name: 'account',
    title: '用户管理',
    iconclass: 'icon-2',
    component: () => import('../views/account'),
    disabled: true,
    meta: { requireAuth: true, belongList: ['运营者'] }
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
      {
        path: '/enterpriseAudit',
        name: 'enterpriseAudit',
        title: '操作员审核',
        component: () => import('../views/enterpriseAudit'),
        meta: { requireAuth: true }
      },
      {
        path: '/companyDetails',
        name: 'companyDetails',
        title: '操作员审核',
        component: () => import('../views/enterpriseAudit/details.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/qyAudit',
        name: 'qyAudit',
        title: '企业审核',
        component: () => import('../views/reg/qyAudit.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/datachainDetails',
        name: 'datachainDetails',
        title: '数据上链详情',
        component: () => import('../views/datachain/details.vue'),
        meta: { requireAuth: true }
      }
    ]
  },
]
let router = new VueRouter({
  mode: 'hash',
  routes: [
    loginRouter,
    regRouter,
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
