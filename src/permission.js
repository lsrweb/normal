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
NProgress.configure({
	showSpinner: true
})
import Cookies from 'js-cookie'

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
			const hasGetUserInfo = store.getters.routerList
			if (hasGetUserInfo) {
				next()
			} else {
				try {
					// await store.dispatch('user/getInfo')
					await store.dispatch('user/getRouter')
					const router = store.getters.routerList
					// 404 路由拼接
					router.push({
						path: '*',
						redirect: '/404',
						hidden: true
					})
					getRouter = router
					routerGo(to, next)
				} catch (error) {
					await store.dispatch('user/resetToken')
					Message.error(error || '出现错误,请刷新页面重新尝试!')
					next(`/login?redirect=${ to.path }`)
					// next(`/login`)
					NProgress.done()
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${ to.path }`)
			// next(`/login`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
	// store.commit('app/SetLoading')
})

function routerGo(to, next) {
	getRouter = filterAsyncRouter(getRouter)
	getRouter.forEach(item => {
		if (item.children) {
			item.children.forEach(value => {
				item.redirect = value.path
			})
		}
	})
	router.addRoutes(getRouter)
	global.antRouter = getRouter
	next({
		...to,
		replace: true
	})
}

function filterAsyncRouter(asyncRouterMap) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (route.component) {
			if (route.component === 'Layout' || route.component == 1) {
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
	return () => Promise.resolve(require(`@/views${ view }.vue`))
}
