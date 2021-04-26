// 权限验证
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

NProgress.configure({
    showSpinner: false
})

const whiteList = ['/login']


router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    if (!hasToken) {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login`)
            NProgress.done()
        }
    } else {
        const hasUserName = store.getters.name
        const userToken = store.getters.getToken
        if (hasUserName && userToken) {
            next()
        } else {
            try {
                await store.dispatch('user/getInfo')
                next()
            } catch (error) {

            }
        }
    }
})
