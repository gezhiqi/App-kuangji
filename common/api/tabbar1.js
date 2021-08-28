import $http from '../request/http.js'

//获取轮播列表
export const getTabbarList = (data) => {
	return $http({
		url:'/app/tabbar/list',
		data,
		method:'POST'
	})
}
// 获取公告列表
export const getNoticeList = () => {
	return $http({
		url:'/app/notice/list',
		method:'POST'
	})
}
// 首页签到
export const activeSign = (data) => {
	return $http({
		url:'/app/active/sign',
		data,
		method:'POST'
	})
}
// 价格列表
export const priceList = (data) => {
	return $http({
		url:'/app/tabbar/main',
		method:'POST'
	})
}
// 根据id查询公告内容
export const noticeInfo = (id) => {
	return $http({
		url:`/app/notice/info?id=${id}`,
		method:'GET'
	})
}