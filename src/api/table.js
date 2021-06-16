import request from '@/utils/request'

export function fetchList(params){
	return request({
		url:'/article/index',
		method:'GET',
		params:{ page:params.page, title:params.title,pageSize: params.sizes }
	})
}

export function add(data){
	return request({
		url:'/article/create',
		method:'POST',
		data:{ title:data.title }
	})
}

export function deleteCow(id){
	return request({
		url:`/article/delete?id=${ id }`,
		method:'DELETE'
	})
}

export function update(data){
	return request({
		url:`/article/update?id=${ data.id }&title=${ data.title }`,
		method:'PUT'
	})
}
