<template>
	<view :ref="`ref${0}`" class="my-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="root-title">
			<view>我的</view>
			<view class="right" @click="goNewPerson">新手规则</view>
		</view>
		<view class="head-box">
			<view class="head"><view class="head-cont"></view></view>
			<view class="tel">{{ userInfo.telephone }}</view>
			<view class="invite">邀请码：{{ userInfo.inviteCode }}</view>
			<view class="my-detail" @click="goToMyDetail">我的明细</view>
		</view>
		<view class="my-purse">
			<view class="purse-title">我的信息</view>
			<view class="purse-box">
				<view class="item" @click="goToRealName">
					<view class="name-icon"></view>
					<view class="recharge">
						{{ userInfo.idCard !== null ? '已实名' : '未实名' }}
					</view>
				</view>
				<view class="item" @click="show = true">
					<view class="dong-icon"></view>
					<view class="recharge">解冻账号</view>
				</view>
				<view class="item" @click="goToPayInfo">
					<view class="money-icon"></view>
					<view class="recharge">收款信息</view>
				</view>
			</view>
		</view>
		<view class="my-ccount">
			<view class="purse-title">账号信息</view>
			<view class="purse-box">
				<view class="item" @click="showToast">
					<view class="purse">可用余额</view>
					<view class="num">{{ userInfo.userBalance }}<text>SUC</text></view>
				</view>
				<view class="item" @click="showToast">
					<view class="purse">冻结余额</view>
					<view class="num">{{ userInfo.frozenBalance }}<text>SUC</text></view>
				</view>
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
		<u-modal
			class="modal"
			v-model="show"
			:show-cancel-button="true"
			@confirm="handleShow"
			@cancel="handleCancel"
			title="温馨提示"
		>
			<view class="modal-box">
				<view class="desc">
					每次解冻扣除<text>5</text>SUC
				</view>
				<u-input placeholder="请输入解冻手机号" v-model="thawTel" type="number" :border="true" trim maxlength="11" />
			</view>
		</u-modal>
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
			sellNum: 0,
			show: false,
			thawTel: ''
		};
	},
	onShow() {
		this.getBubbleNum();
		this.getUserInfo();
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.telephone = uni.getStorageSync('telephone') || '';
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
		},
		goNewPerson() {
			uni.navigateTo({
				url: '/pages/my/my-newperson'
			});
		},
		goToMyDetail() {
			uni.navigateTo({
				url: '/pages/my/my-detail'
			});
		},
		handleCancel() {
			this.thawTel = ''
			this.show =false
		},
		handleShow() {
			if (!this.validate().telephone()) {
				return false;
			}
			this.$api.thawTel(this.thawTel).then(res => {
				const { code, msg } = res.data;
				if (code === 200) {
					this.$refs.uToast.show({
						title: '解冻成功',
						type: 'success'
					});
					this.getBubbleNum();
					this.getUserInfo();
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'error'
					});
				}
			});
		},
		validate() {
			let scope = this;
			return {
				telephone() {
					if (scope.thawTel === '' || scope.thawTel === null) {
						scope.$refs.uToast.show({
							title: '手机号不能为空',
							type: 'error'
						});
						return false;
					}
					if (!/^1\d{10}$/.test(scope.thawTel)) {
						scope.$refs.uToast.show({
							title: '手机格式不正确',
							type: 'error'
						});
						return false;
					} else {
						return true;
					}
				}
			};
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
	.root-title {
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
		position: relative;
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
		.my-detail {
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			font-size: 24rpx;
			height: 28rpx;
			line-height: 28rpx;
			padding: 4rpx 10rpx;
			border: 1rpx solid #fff;
			border-radius: 28rpx;
		}
	}
	.my-purse {
		background-color: #1e1c41;
		margin-top: 30rpx;
		border-radius: 20rpx;
		.purse-title {
			padding-top: 30rpx;
			padding-left: 30rpx;
			font-size: 32rpx;
		}
		.purse-box {
			height: 170rpx;
			width: 100%;
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
					font-size: 40rpx;
					
				}
				.name-icon {
					width: 60rpx;
					height: 60rpx;
					background: url(../../static/my/name.png) no-repeat center center;
					background-size: 100%;
					margin-bottom: 20rpx;
				}
				.dong-icon {
					width: 60rpx;
					height: 60rpx;
					background: url(../../static/my/jiedong.png) no-repeat center center;
					background-size: 55rpx 55rpx;
					margin-bottom: 20rpx;
				}
				.money-icon {
					width: 60rpx;
					height: 60rpx;
					background: url(../../static/my/money.png) no-repeat center center;
					background-size: 100%;
					margin-bottom: 20rpx;
				}
			}
		}
	}
	.my-ccount {
		background-color: #1e1c41;
		margin-top: 30rpx;
		border-radius: 20rpx;
		.purse-title {
			padding-top: 30rpx;
			padding-left: 30rpx;
			font-size: 32rpx;
		}
		.purse-box {
			height: 170rpx;
			width: 100%;
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
					margin-top: 20rpx;
					font-size: 44rpx;
					text {
						font-size: 28rpx;
						padding-left: 10rpx;
					}
				}
				.name-icon {
					width: 60rpx;
					height: 60rpx;
					background: url(../../static/my/name.png) no-repeat center center;
					background-size: 100%;
					margin-bottom: 20rpx;
				}
				.money-icon {
					width: 60rpx;
					height: 60rpx;
					background: url(../../static/my/money.png) no-repeat center center;
					background-size: 100%;
					margin-bottom: 20rpx;
				}
			}
		}
	}
	.my-order {
		margin-top: 30rpx;
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
	.modal {
		.modal-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			.desc {
				margin-top: 10rpx;
				font-size: 28rpx;
				text {
					padding: 0 6rpx;
				}
			}
			.u-input {
				margin-top: 20rpx;
				width: 400rpx;
				height: 50rpx;
				font-size: 32rpx;
				::v-deep .u-input__input {
					font-size: 32rpx;
					color: #333333;
				}
			}
			.uni-input-placeholder {
				font-size: 32rpx;
			}
		}
	}
}
</style>
