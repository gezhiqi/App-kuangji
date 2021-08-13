import $http from '../request/http.js'
// 登录
export const login = (data) => {
	return $http({
		url:'/app/main/login',
		data,
		method:'POST'
	})
}
// 注册
export const register = (data) => {
	return $http({
		url:'/app/main/register',
		data,
		method:'POST'
	})
}
// 注册验证码
export const sendRegister = (data) => {
	return $http({
		url:'/app/message/send/aliregister',
		data,
		method:'POST'
	})
}
// 忘记密码验证码
export const sendForget = (data) => {
	return $http({
		url:'/app/main/forget',
		data,
		method:'POST'
	})
}
// 退出登录
export const loginOut = () => {
	return $http({
		url:'/app/main/lgout',
		method:'POST'
	})
}





 
