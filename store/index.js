import Vue from "vue"
import Vuex from 'vuex'
import reqDataList from '../common/api/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userInfo: {
			name: '',
			userBalance: 0,
			frozenBalance:0
			
		},
		version: '',
		andUrl:'',
		iosUrl:''
	},
	mutations: {
		setUserInfo(state, value) {
			state.userInfo = {
				...value
			}
		},
		setVersion(state, value) {
			state.version = value
		},
		setAnd(state, value) {
			state.andUrl = value
		},
		setIos(state, value) {
			state.iosUrl = value
		},
	},
	actions: {
		getUserInfo({
			commit
		}) {
			return new Promise((resolve, reject) => {
				reqDataList
					.userInfo().then(res => {
						const {
							data,
							code,
							msg
						} = res.data
						commit('setUserInfo', data)
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		getVersion({
			commit
		}) {
			return new Promise((resolve, reject) => {
				reqDataList
					.version().then(res => {
						const {
							data,
							code,
							msg
						} = res.data
						commit('setVersion', data.version)
						commit('setAnd', data.androidUrl || '')
						commit('setIos', data.iosUrl || '')
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		}
	}
})
export default store
