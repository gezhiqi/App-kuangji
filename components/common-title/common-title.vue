<template>
	<view :style="{ paddingTop: statusBarHeight + 'px'}" class="title">
		<view v-if="isBack" class="back" @click="goBack"></view>
		<slot></slot>
		<view v-if="$slots.right" class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CommonTitle',
	props: {
		isBack: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			statusBarHeight: 0
		};
	},
	created() {
		let that = this;
		uni.getSystemInfo({
			success: res => {
				that.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	methods: {
		goBack() {
			uni.navigateBack(1);
		}
	}
};
</script>

<style lang="scss">
.title {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #ced3e1;
	font-size: 32rpx;
	z-index: 99;
	background-image: linear-gradient(45deg, #110e2a, #110e2a);
	.back {
		position: absolute;
		left: 30rpx;
		bottom: 26rpx;
		width: 36rpx;
		height: 36rpx;
		background: url('../../static/back.png') no-repeat center center;
		background-size: 100% 100%;
	}
	.right {
		font-size: 24rpx;
		position: absolute;
		right: 30rpx;
		bottom: 20rpx;
		line-height: 36rpx;

	}
}
</style>
