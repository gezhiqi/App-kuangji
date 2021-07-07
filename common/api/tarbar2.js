import $http from '../request/http.js'
//获取商品列表场次
export const getSession = () => {
	return $http({
		url:'/app/play/list',
		method:'GET'
	})
}

//获取商品列表
export const getShopList = (data) => {
	return $http({
		url:'/app/shop/list',
		data,
		method:'POST'
	})
}

// 查询商品详情
export const getShopDetail = (data) => {
	return $http({
		url:'/app/shop/select',
		data,
		method:'POST'
	})
}

// 商品购买
export const createdOrder = (data) => {
	return $http({
		url:'/app/order/buy',
		data,
		method:'POST'
	})
}