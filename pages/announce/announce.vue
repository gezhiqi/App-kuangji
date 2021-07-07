<template>
	<view class="announce-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>公告</common-title>
		<view class="no-data">暂无消息</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				that.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	methods: {}
};
</script>

<style lang="scss">
uni-page-body,
body {
	height: 100%;
}
.announce-root {
	padding: 60rpx 30rpx 100rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.no-data {
		margin-top: 100rpx;
		text-align: center;
		font-size: 40rpx;
	}
}
</style>
