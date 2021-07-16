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
export const getNoticeList = (data) => {
	return $http({
		url:'/app/notice/list',
		data,
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