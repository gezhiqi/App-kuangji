<script>
	import { version } from 'common/version.js'
export default {

	onLaunch: function() {
		let that = this;
		// 检测版本更新
		// console.log(version)
		// that.checkVersion();
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods: {
		checkVersion() {
			let that = this;
			// #ifdef APP-PLUS

			plus.screen.lockOrientation('portrait-primary'); // 竖屏锁定
			// console.log(plus.runtime.version);
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				console.log('widgetInfo',widgetInfo)
			})
			return false;
			uni.request({
				url: config.verifyVersion, // 接口请求地址,也就是上面我们编写的index.php
				method: 'POST',
				data: {
					version: plus.runtime.version // uniapp H5+ 提供的获取版本号的方法
				},
				header: {
					appid: plus.runtime.appid, // uniapp H5+ 提供的获取APPID的方法
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				dataType: 'JSON',
				success: function(res) {
					// 如果code === 1 则需要更新
					if (res.data.code == 1) {
						uni.showModal({
							title: '有新的版本',
							content: '请确认是否更新?',
							success: info => {
								if (info.confirm) {
									// 因为App.vue中不能直接使用组件，这里用到了vuex来调用下载进度的组件
									// 显示下载进度弹窗
									that.$store.commit('setHide', true);
									if (plus.os.name.toLowerCase() == 'ios') {
										// ios直接跳转到下载页面
										plus.runtime.openURL(res.data.data.url);
									} else {
										that.createDownload(res.data.data.url);
									}
								}
							}
						});
					} else if (res.data.code != 2) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 3000
						});
					}
				}
			});
			// #endif
		}
	}
};
</script>

<style>
/*每个页面公共css */
</style>
