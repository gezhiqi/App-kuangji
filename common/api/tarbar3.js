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
//我的矿机
export const userMining = (data) => {
	return $http({
		url:'/app/machine/user/list',
		data,
		method:'POST'
	})
}
//开启矿机|一键开启
export const openMining = (data) => {
	return $http({
		url:'/app/machine/open',
		data,
		method:'POST'
	})
}
//矿机收益|一键收益
export const receiveIncome = (data) => {
	return $http({
		url:'/app/machine/profit',
		data,
		method:'POST'
	})
}

//获取用户矿机收益详情
export const miningUserInfo = () => {
	return $http({
		url:'/app/machine/user/info',
		method:'POST'
	})
}