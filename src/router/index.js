import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
// No permission router
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {title: '首页', icon: 'dashboard'}
        }]
    },
    {
        path: '/external-link',
        component: Layout,
        children: [
            {
                path: 'http://srliforever.ltd/',
                meta: {title: '友链', icon: 'link'}
            }
        ]
    },
    {path: '*', component: () => import('@/views/404')}
]

const createRouter = () => new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
