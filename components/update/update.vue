<template>
	<u-modal v-model="show" confirm-text="升级" title="发现新版本" @confirm="confirm">
		<view class="u-update-content"><rich-text :nodes="content"></rich-text></view>
	</u-modal>
</template>

<script>
export default {
	props:['android','ios'],
	data() {
		return {
			show: false,
			// 传递给uni-app"rich-text"组件的内容，可以使用"<br>"进行换行
			content: `
				1. 修复badge组件的size参数无效问题<br>
				2. 新增Modal模态框组件<br>
				3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
			`
		};
	},
	created() {
	},
	methods: {
		confirm() {
			
			if (uni.getSystemInfoSync().platform == 'android') {
				plus.runtime.openURL(
					this.android,
					function(res) {
						console.log(res);
					}
				);
			}else {
				plus.runtime.openURL(
					this.ios,
					function(res) {
						console.log(res);
					}
				);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.u-full-content {
	background-color: #00c777;
}

.u-update-content {
	font-size: 26rpx;
	color: $u-content-color;
	line-height: 1.7;
	padding: 30rpx;
}
</style>
