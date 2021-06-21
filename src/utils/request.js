import axios from 'axios'
import {
	// MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import {
	getToken
} from '@/utils/auth'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 15000
})

// request interceptor
service.interceptors.request.use(
	config => {
		if (store.getters.token) {
			config.headers['token'] = getToken()
		}
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code != 200) {
			Message({
				message: res.msg || 'Error',
				type: 'error',
				duration: 5 * 1000
			})
			return Promise.reject(new Error(res.msg || 'Error'))
		} else {
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		Message({
			message: error.msg,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
