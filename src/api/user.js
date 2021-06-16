import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/site/login',
		method: 'post',
		data
	})
}

export function getInfo(token) {
	return request({
		url: '/vue-admin-template/user/info',
		method: 'get',
		params: {
			token
		}
	})
}

export function getRouter() {
	return request({
		url: '/backendMember/get-role',
		method: 'get',
	})
}

export function logout() {
	return request({
		url: '/vue-admin-template/user/logout',
		method: 'post'
	})
}
