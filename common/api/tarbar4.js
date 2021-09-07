import $http from '../request/http.js'
//币种价格走势
export const priceTrend = (data) => {
	return $http({
		url: '/app/price/list',
		data,
		method: 'POST'
	})
}
//交易订单列表
export const orderList = (data) => {
	return $http({
		url: '/app/order/list',
		data,
		method: 'POST'
	})
}
//创建购买订单
export const createOrder = (data) => {
	return $http({
		url: '/app/order/buy',
		data,
		method: 'POST'
	})
}
// 根据订单id查询订单
export const checkingOrder = (id) => {
	return $http({
		url: `/app/order/info?id=${id}`,
		method: 'GET'
	})
}
// 查看我的订单
export const checkingMyOrder = (data) => {
	return $http({
		url: '/app/order/own/list',
		data,
		method: 'POST'
	})
}
// 买家付款
export const buyerPays = (id) => {
	return $http({
		url: `/app/order/payment?id=${id}`,
		method: 'GET'
	})
}
// 卖家确认
export const sellerConfirm = (id) => {
	return $http({
		url: `/app/order/make?id=${id}`,
		method: 'GET'
	})
}
// 买家取消
export const buyerCancel = (id) => {
	return $http({
		url: `/app/order/remove?id=${id}`,
		method: 'GET'
	})
}
//卖家匹配订单
export const sellCancel = (id, payNum) => {
	return $http({
		url: `/app/order/sell?id=${id}&payPw=${payNum}`,
		method: 'GET'
	})
}
// 购买订单列表
export const buyList = (data) => {
	return $http({
		url: '/app/order/buy/list',
		data,
		method: 'POST'
	})
}
// 出售订单列表
export const sellList = (data) => {
	return $http({
		url: '/app/order/sell/list',
		data,
		method: 'POST'
	})
}
//实名认证
export const realName = (name, idCard) => {
	return $http({
		url: `/app/user/real?userName=${name}&idCard=${idCard}`,
		method: 'POST'
	})
}
//上传微信
export const wxPay = (data) => {
	return $http({
		url: '/app/user/save/vx',
		data,
		method: 'POST'
	})
}
// 获取订单气泡数
export const bubbleNum = () => {
	return $http({
		url: '/app/order/transaction',
		method: 'GET'
	})
}
// 获取用户信息
export const userInfo = () => {
	return $http({
		url: '/app/user/info',
		method: 'POST'
	})
}
//银行卡收款信息
export const saveBank = (data) => {
	return $http({
		url: '/app/user/save/bank',
		data,
		method: 'POST'
	})
}
//我的明细，用户收支明细
export const detailList = (data) => {
	return $http({
		url: '/app/profit/list',
		data,
		method: 'POST'
	})
}
//邀请列表
export const teamList = (statu) => {
	return $http({
		url: `/app/user/team?status=${statu}`,
		method: 'POST'
	})
}
//获取新手介绍列表
export const newProsonCourse = () => {
	return $http({
		url: `/app/introduce/list`,
		method: 'POST'
	})
}
// 新手介绍内容
export const getCourseDetail = (id) => {
	return $http({
		url: `/app/introduce/info?id=${id}`,
		method: 'GET'
	})
}
// 解冻
export const thawTel = (telephone) => {
	return $http({
		url: `/app/user/relieve?telephone=${telephone}`,
		method: 'GET'
	})
}
// 反馈
export const feedback = (data) => {
	return $http({
		url: `/app/feedback/save`,
		data,
		method: 'POST'
	})
}
// 查询客服
export const getServe = () => {
	return $http({
		url: `/app/customer/select`,
		method: 'PUT'
	})
}
