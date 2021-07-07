import $http from '../request/http.js'

//获取商品列表
export const getTabbarList = (data) => {
	return $http({
		url:'/app/tabbar/list',
		data,
		method:'GET'
	})
}