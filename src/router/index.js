import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 初始化路由
const routes = [{
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'login'
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard'),
    name: 'home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
