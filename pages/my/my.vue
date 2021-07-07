<template>
	<view :ref="`ref${0}`" class="my-root" :style="{ paddingTop: statusBarHeight + 20 + 'px' }">
		<view class="head-box">
			<view class="head"><view class="head-cont"></view></view>
			<view class="tel">{{ telephone }}</view>
			<view class="invite">邀请码：xxxx</view>
		</view>
		<view class="my-purse">
			<view class="left" @click="showToast">
				<view class="num">0.00</view>
				<view class="purse">钱包</view>
			</view>
			<view class="right" @click="showToast">
				<view class="icon"></view>
				<view class="recharge">立即充值</view>
			</view>
		</view>
		<view class="my-order">
			<view class="order-title">我的订单</view>
			<view class="order-cont">
				<view class="left" @click="showToast">我的竞拍</view>
				<view class="right" @click="showToast">我的委拍</view>
			</view>
		</view>
		<view class="more">
			<u-button @click="loginOut">退出登录</u-button>
			<view class="more-more">更多玩法敬请期待</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			telephone: '',
			index: 0
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.telephone = uni.getStorageSync('telephone') || '';
	},
	methods: {
		toLogin() {
			// this.$Router.push({name:'login'})
			uni.redirectTo({
				url: '/pages/login/login'
			});
		},
		loginOut() {
			uni.showLoading({
				title: '正在退出'
			});
			uni.removeStorageSync('token');
			setTimeout(() => {
				uni.hideLoading();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}, 1000);
		},
		showToast() {
			this.$refs.uToast.show({
				title: '暂未开放'
			});
		}
	}
};
</script>

<style lang="scss">
uni-page-body,
body{
	height: 100%;
}
.my-root {
	padding: 60rpx 30rpx 120rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.head-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 340rpx;
		width: 100%;
		background: url(../../static/header-bg.png) no-repeat center center;
		background-size: 100% 100%;
		font-size: 30rpx;
		.head {
			height: 150rpx;
			width: 150rpx;
			background-color: #fff;
			border-radius: 50%;
			.head-cont {
				height: 150rpx;
				width: 150rpx;
				background: url(../../static/head.png) no-repeat center center;
				background-size: 120rpx 120rpx;
			}
		}
		.tel {
			margin-top: 10rpx;
		}
	}
	.my-purse {
		margin-top: 60rpx;
		height: 240rpx;
		width: 100%;
		background-color: #1e1c41;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 30rpx;
		.left {
			.num {
				line-height: 50rpx;
				margin-bottom: 20rpx;
			}
		}
		.right {
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon {
				width: 50rpx;
				height: 50rpx;
				background: url(../../static/lead-3.png) no-repeat center center;
				background-size: 100%;
				margin-bottom: 20rpx;
			}
		}
	}
	.my-order {
		margin-top: 60rpx;
		height: 240rpx;
		width: 100%;
		background-color: #1e1c41;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		.order-title {
			padding-top: 30rpx;
			padding-left: 30rpx;
			font-size: 32rpx;
		}
		.order-cont {
			flex: 1;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 30rpx;
		}
	}
	.more {
		padding: 50rpx 30rpx 30rpx;
		margin-top: 60rpx;
		height: 240rpx;
		width: 100%;
		background-color: #1e1c41;
		border-radius: 20rpx;
		box-sizing: border-box;

		.more-more {
			margin-top: 40rpx;
			text-align: center;
		}
	}
}
</style>
