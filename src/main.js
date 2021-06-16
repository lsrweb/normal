import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import '@/icons'

// 无路由权限放开此文件
// import '@/nonepermission'
// 有路由权限禁用 上方文件,放开下方文件
import '@/permission'

if (process.env.NODE_ENV === 'production') {
	const {
		mockXHR
	} = require('../mock')
	mockXHR()
}
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
