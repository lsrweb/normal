import router from './router' // 导入路由
import store from './store' // 导入 store
import {
    Message
} from 'element-ui' // 导入信息提示
import NProgress from 'nprogress' // 导入进度条
import 'nprogress/nprogress.css' // 导入进度条样式
import {
    getToken
} from '@/utils/auth' // 导入获取用户信息函数
import getPageTitle from '@/utils/get-page-title' // 获取页面标题
import Layout from '@/layout' // 导入 Layout组件
// import Cookies from 'js-cookie' // 导入js-cookie管理
NProgress.configure({
    showSpinner: true // 进度条配置 加载圈圈
})
let getRouter

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    NProgress.start() // 进度条开始
    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
            NProgress.done() // 进度条结束
        } else { // 判断无 token
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    await store.dispatch('user/getRouter')
                    const router = store.getters.routerList
                    console.log(router)
                    getRouter = router
                    saveObjArr('router', getRouter)
                    routerGo(to, next)
                } catch (error) {
                    console.log(error)
                    await store.dispatch('user/resetToken')
                    Message.error('出现错误,请刷新页面重新尝试!')
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
