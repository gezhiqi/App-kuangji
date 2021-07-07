import Vue from 'vue'
import App from './App'
import router from './router'
import { RouterMount } from 'uni-simple-router'
import uView from "uview-ui";
import api from './common/api/index.js'
import CommonTitle from "./components/common-title/common-title.vue"
// import Vconsole from 'vconsole';

Vue.component('common-title', CommonTitle)

Vue.prototype.checkLogin = function(){
	const token = uni.getStorageSync('token')
	if(token === ''){ // 本地没有token表示未登录
		console.log('未登录返回到登录页')
		uni.reLaunch({url:'/pages/login/login'})
		return false
	}
}


Vue.prototype.$api = api
Vue.use(uView);
// new Vconsole();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
