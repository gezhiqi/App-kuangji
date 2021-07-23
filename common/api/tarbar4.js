import $http from '../request/http.js'
//币种价格走势
export const priceTrend = (data) => {
	return $http({
		url:'/app/price/list',
		data,
		method:'POST'
	})
}
//交易订单列表
export const orderList = (data) => {
	return $http({
		url:'/app/order/list',
		data,
		method:'POST'
	})
}
//创建购买订单
export const createOrder = (data) => {
	return $http({
		url:'/app/order/buy',
		data,
		method:'POST'
	})
}
// 根据订单id查询订单
export const checkingOrder = (data) => {
	return $http({
		url:'/app/order/info',
		data,
		method:'POST'
	})
}
// 查看我的订单
export const checkingMyOrder = (data) => {
	return $http({
		url:'/app/order/own/list',
		data,
		method:'POST'
	})
}
// 买家付款
export const buyerPays = (data) => {
	return $http({
		url:'/app/order/payment',
		data,
		method:'POST'
	})
}
// 买家确认
export const sellerConfirm = (data) => {
	return $http({
		url:'/app/order/make',
		data,
		method:'POST'
	})
}
// 买家取消
export const buyerCancel = (data) => {
	return $http({
		url:'/app/order/remove',
		data,
		method:'POST'
	})
}
//
export const sellCancel = (data) => {
	return $http({
		url:'/app/order/sell',
		data,
		method:'POST'
	})
}
