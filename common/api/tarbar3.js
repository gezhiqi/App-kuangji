import $http from '../request/http.js'
//获取矿机列表
export const miningList = (data) => {
	return $http({
		url:'/app/machine/list',
		data,
		method:'POST'
	})
}
//购买矿机
export const buyMining = (data) => {
	return $http({
		url:'/app/machine/buy',
		data,
		method:'POST'
	})
}
//购买矿机
export const userMining = (data) => {
	return $http({
		url:'/app/machine/user/list',
		data,
		method:'POST'
	})
}