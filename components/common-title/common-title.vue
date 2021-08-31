<template>
	<view
		:style="{
			paddingTop: statusBarHeight + 'px',
			top: statusBarHeight,
			'background-color': bgColor
		}"
		class="title"
	>
		<view v-if="isBack" class="back" @click="goBack"></view>
		<slot></slot>
		<view v-if="$slots.right" class="right"><slot name="right"></slot></view>
	</view>
</template>

<script>
export default {
	name: 'CommonTitle',
	props: {
		isBack: {
			type: Boolean,
			default: false
		},
		bgColor: {
			type: String,
			default: '#150e2d'
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
	// background-image: linear-gradient(45deg, #110e2a, #110e2a);
	display: flex;
	align-items: center;
	justify-content: center;
	.back {
		position: absolute;
		left: 30rpx;
		width: 56rpx;
		height: 56rpx;
		background: url('../../static/back.png') no-repeat center center;
		background-size: 40rpx 40rpx;
	}
	.right {
		font-size: 24rpx;
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		line-height: 36rpx;
	}
}
</style>
