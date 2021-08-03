import Vue from "vue"
import Vuex from 'vuex'
import reqDataList from '../common/api/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userInfo: {
			name: ''
		}
	},
	mutations: {
		setUserInfo(state, value) {
			state.userInfo = {
				...value
			}
		}
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
		}
	}
})
export default store
