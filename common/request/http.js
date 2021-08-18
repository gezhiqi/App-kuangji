export const BASE_URL = 'https://api.czldny.com'
export default function $http(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				token: uni.getStorageSync('token')
			},
			success: (res) => {
				if (res == '') {
					return uni.showToast({
						icon: 'loading',
						title: '获取数据失败'
					})
				}
				if (res.data.code == 401) {
					uni.redirectTo({url:'/pages/login/login'})
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					icon: 'loading',
					title: '请求失败'
				})
				reject(err)
			}
		})
	})
	// return new Promise((reslove, reject) => {

	// })
}
