import $http from '../request/http.js'
//获取质押列表
export const getPledgeList = () => {
	return $http({
		url:'/app/pledge/shop',
		method:'POST'
	})
}
//获取用户质押详情
export const pledgeDetail = (data) => {
	return $http({
		url:'/app/pledge/list',
		data,
		method:'POST'
	})
}
//获取用户质押总数
export const userPledge = () => {
	return $http({
		url:'/app/pledge/total',
		method:'POST'
	})
}
//获取用户质押总数
export const buyPledge = (data) => {
	return $http({
		url:'/app/pledge/buy',
		data,
		method:'POST'
	})
}


