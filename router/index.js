// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
	encodeURI: false,
	routes: [...modules] //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {

	//将所有需要登陆才显示的页面的路由都放进一个数组
	const nextRoute = ['my', 'auction', 'auction-detail', 'pledge', 'announce', 'mall', 'index'];
	//获取登陆状态
	let isLogin = uni.getStorageSync('token')
	console.log('isLogin', isLogin)
	if (to.name === 'login') { //如果是登录页，则跳过验证
		next() //必不可少
		return //以下的代码不执行
	}
	if (nextRoute.indexOf(to.name) >= 0) { //判断该页面是否需要登陆
		if (!isLogin) { //判断登陆状态
			next({
				name: 'login'
			}) //如果未登录，则跳转到登录页
			// uni.redirectTo({
			// 	url:'/pages/login/login.vue'
			// })
		} else {
			next() //如果已经登陆，那就可以跳转
		}
	} else { //其他的无需登陆的页面不做验证
		next()
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
