import router from './router'
import store from './store'
import {
    Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
    getToken
} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import Layout from '@/layout'
// import Cookies from 'js-cookie'
NProgress.configure({
    showSpinner: true
})
let getRouter

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
            NProgress.done()
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    await store.dispatch('user/getRouter')
                    const router = store.getters.routerList
                    getRouter = router
                    saveObjArr('router', getRouter)
                    routerGo(to, next)
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || '出现错误,请刷新页面重新尝试!')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})

function routerGo(to, next) {
    getRouter = filterAsyncRouter(getRouter)
    router.addRoutes(getRouter)
    global.antRouter = getRouter
    next({
        ...to,
        replace: true
    })
}

function saveObjArr(name, data) {
    localStorage.setItem(name, JSON.stringify(data))
}
function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = loadView(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
    return accessedRouters
}

// 重新导入路由
const loadView = (view) => {
    return () => Promise.resolve(require(`@/views${view}`))
}
