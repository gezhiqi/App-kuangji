<template>
	<view :ref="`ref${0}`" class="my-root" :style="{ paddingTop: statusBarHeight + 20 + 'px' }">
		<view class="head-box">
			<view class="head"><view class="head-cont"></view></view>
			<view class="tel">{{ userInfo.telephone }}</view>
			<view class="invite">邀请码：{{ userInfo.inviteCode }}</view>
		</view>
		<view class="my-purse">
			<view class="item" @click="goToRealName">
				<view class="name-icon"></view>
				<view class="recharge">{{ userInfo.idCard !== null ? '已实名' : '未实名' }}</view>
			</view>
			<view class="item" @click="showToast">
				<view class="num">{{ userInfo.userBalance }}</view>
				<view class="purse">钱包</view>
			</view>
			<view class="item" @click="goToPayInfo">
				<view class="money-icon"></view>
				<view class="recharge">收款信息</view>
			</view>
		</view>
		<view class="my-order">
			<view class="order-title">我的订单</view>
			<view class="order-cont">
				<view class="left" @click="goMyBuy">
					<image class="img" src="../../static/my/buy.png" mode=""></image>
					<text class="desc">购买订单</text>
					<text v-show="buyNum > 0" class="num">{{ buyNum }}</text>
				</view>
				<view class="right" @click="goMySell">
					<image class="img" src="../../static/my/sell.png" mode=""></image>
					<text class="desc">出售订单</text>
					<text v-show="sellNum > 0" class="num">{{ sellNum }}</text>
				</view>
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
import { mapActions, mapState } from 'vuex';
export default {
	data() {
		return {
			statusBarHeight: 0,
			telephone: '',
			index: 0,
			buyNum: 0,
			sellNum: 0
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.telephone = uni.getStorageSync('telephone') || '';
		this.getBubbleNum();
		this.getUserInfo();
	},
	onShow() {
		this.getBubbleNum();
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapActions(['getUserInfo']),
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
			this.$api
				.loginOut()
				.then(res => {
					const { data, code, msg } = res.data;
					if (code === 200) {
						uni.removeStorageSync('token');
						let timer = setTimeout(() => {
							uni.hideLoading();
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}, 1000);
						this.$once('hook:beforeDestory', () => {
							clearInterval(timer);
							timer = null;
						});
					} else {
						uni.removeStorageSync('token');
						let timer = setTimeout(() => {
							uni.hideLoading();
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}, 1000);
						this.$once('hook:beforeDestory', () => {
							clearInterval(timer);
							timer = null;
						});
					}
				})
				.catch(err => {
					uni.removeStorageSync('token');
					let timer = setTimeout(() => {
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 1000);
					this.$once('hook:beforeDestory', () => {
						clearInterval(timer);
						timer = null;
					});
				});
		},
		getBubbleNum() {
			this.$api.bubbleNum().then(res => {
				const { buy, code, sell } = res.data;
				if (code === 200) {
					this.buyNum = buy.transactionCount + buy.paymentCount;
					this.sellNum = sell.transactionCount + sell.paymentCount;
				}
			});
		},
		showToast() {
			this.$refs.uToast.show({
				title: '暂未开放'
			});
		},
		goToRealName() {
			uni.navigateTo({
				url: '/pages/my/my-real-name'
			});
		},
		goToPayInfo() {
			uni.navigateTo({
				url: '/pages/my/my-payinfo'
			});
		},
		goMyBuy() {
			uni.navigateTo({
				url: '/pages/my/my-buy'
			});
		},
		goMySell() {
			uni.navigateTo({
				url: '/pages/my/my-sell'
			});
		}
	}
};
</script>

<style lang="scss">
uni-page-body,
body {
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

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			.num {
				line-height: 50rpx;
				margin-bottom: 20rpx;
				// color: #3c78fa;
				font-size: 52rpx;
			}
			.name-icon {
				width: 60rpx;
				height: 50rpx;
				background: url(../../static/my/name.png) no-repeat center center;
				background-size: 100%;
				margin-bottom: 20rpx;
			}
			.money-icon {
				width: 60rpx;
				height: 50rpx;
				background: url(../../static/my/money.png) no-repeat center center;
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
			.left,
			.right {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				.img {
					width: 55rpx;
					height: 55rpx;
				}
				.desc {
					padding-top: 12rpx;
				}
				.num {
					position: absolute;
					right: -10rpx;
					top: -5rpx;
					padding: 4rpx 8rpx;
					line-height: 22rpx;
					border-radius: 22rpx;
					font-size: 24rpx;
					background-color: #fa3534;
				}
			}
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
