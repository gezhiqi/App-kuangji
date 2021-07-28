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
export const checkingOrder = (id) => {
	return $http({
		url:`/app/order/info?id=${id}`,
		method:'GET'
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
export const buyerPays = (id) => {
	return $http({
		url:`/app/order/payment?id=${id}`,
		method:'GET'
	})
}
// 卖家确认
export const sellerConfirm = (id) => {
	return $http({
		url:`/app/order/make?id=${id}`,
		method:'GET'
	})
}
// 买家取消
export const buyerCancel = (id) => {
	return $http({
		url:`/app/order/remove?id=${id}`,
		method:'GET'
	})
}
//卖家匹配订单
export const sellCancel = (id) => {
	return $http({
		url:`/app/order/sell?id=${id}`,
		method:'GET'
	})
}
// 购买订单列表
export const buyList = (data) => {
	return $http({
		url:'/app/order/buy/list',
		data,
		method:'POST'
	})
}
// 出售订单列表
export const sellList = (data) => {
	return $http({
		url:'/app/order/sell/list',
		data,
		method:'POST'
	})
}
//上传微信
export const wxPay = (data) => {
	return $http({
		url:'/app/user/save/vx',
		data,
		method:'POST'
	})
}