import router from './router'
import {
	Message
} from 'element-ui'
import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'


const whiteList = ['/login']
router.beforeEach (async ( to, form, next ) => {
	document.title = getPageTitle (to.meta.title)
	const hasToken = Cookies.get ('userToken')
	if (hasToken) {
		if (to.path === '/login') {
			next ({
				path: '/'
			})
		} else {
			const hasGetUserInfo = hasToken
			if (hasGetUserInfo) {
				next ()
			} else {
				try {
					next ()
				} catch (error) {
					Cookies.remove ('userToken')
					Message.error (error || 'Page Error, please region')
					next (`/login?redirect=${ to.path }`)
				}
			}
		}
	} else {
		if (whiteList.indexOf (to.path) !== -1) {
			next ()
		} else {
			next (`/login?redirect=${ to.path }`)

		}
	}
})
