<template>
	<view class="mining-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="root-title">
			<view>矿机</view>
			<view class="right" @click="goDetail('0f1cbe82-00ba-11ec-8e3b-52540029ab15')">矿机说明</view>
		</view>
		<view class="my-balance">
			<view class="balance-box">
				<view class="balance-title"><text>我的矿机总价值</text></view>
				<view class="balance-num">
					<text>
						{{ totalPrice }}
						<text class="unit">CNY</text>
					</text>
				</view>
				<view class="daily-output">
					<text>预计每日产出 +{{ output }} SUC</text>
					<text>已产出 +{{ revenue }} SUC</text>
				</view>
				<view class="cumulative-output">
					<!-- <text>持有价值 +{{ totalPrice }}</text> -->
					<text>预计总收益 +{{ totalRevenue }} SUC</text>
				</view>
				<view class="footer">
					<view class="button" @click="goToMyMining">我的矿机</view>
					<text>矿机数量：{{ num }}</text>
				</view>
			</view>
		</view>
		<view class="mining-box">
			<view class="mining-title">
				<text class="left">热门矿机产品</text>
				<text class="right">矿机周期均为30天</text>
			</view>
			<view class="mining-list">
				<view class="mining-item" v-for="item in miningList">
					<view class="left"><image :src="item.imageUrl" mode="aspectFit"></image></view>
					<view class="right">
						<view class="right-title">矿机名称：{{ item.title }}</view>
						<view class="right-top">
							<view class="right-top-i">
								<view class="right-top-top">{{ item.price }}</view>
								<view class="right-top-bottom">价格</view>
							</view>
							<view class="right-top-i">
								<view class="right-top-top">{{ item.rate }}</view>
								<view class="right-top-bottom">收益率</view>
							</view>
							<view class="right-top-i">
								<view class="right-top-top">{{ item.output }}</view>
								<view class="right-top-bottom">每日产出</view>
							</view>
							<view class="right-top-i">
								<view class="right-top-top">{{ item.totalOutput }}</view>
								<view class="right-top-bottom">总产出</view>
							</view>
						</view>
						<view class="right-button" @click="buyMining(item)">购买</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal
			v-model="showModal"
			:show-cancel-button="true"
			content="确定购买矿机"
			@cancel="showModal = false"
			@confirm="showBuy"
		></u-modal>
		<keyboard ref="keyboard" @complete="enterPassword" :desc="desc"></keyboard>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import keyboard from '../../components/keyboard/keyboard.vue'
export default {
	data() {
		return {
			statusBarHeight: 0,
			miningList: [],
			showModal: false,
			currentItem: {},
			num: 0,
			output: 0,
			revenue: 0,
			totalNum: 0,
			totalPrice: 0,
			totalRevenue: 0,
			desc: ''
		};
	},
	components:{
		keyboard
	},
	computed: {
		...mapState(['userInfo'])
	},
	onShow() {
		this.getMiningList();
		this.getMiningUserInfo();
		this.getUserInfo();
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
	},

	methods: {
		...mapActions(['getUserInfo']),
		getMiningUserInfo() {
			this.$api.miningUserInfo().then(res => {
				if (res.data.code === 200) {
					this.num = res.data.num;
					this.output = res.data.output;
					this.revenue = res.data.revenue;
					this.totalNum = res.data.totalNum;
					this.totalPrice = res.data.totalPrice;
					this.totalRevenue = res.data.totalRevenue;
				}
			});
		},
		getMiningList() {
			this.$api.miningList().then(res => {
				console.log(res);
				let { data, code } = res.data;
				if (code === 200) {
					this.miningList = data;
				}
			});
		},
		// getUserMining() {
		// 	this.$api.userMining().then(res => {
		// 		console.log(res);
		// 		let { data, code } = res.data;
		// 		if (code === 200) {
		// 			this.miningNum = data.length;
		// 		}
		// 	});
		// },
		buyMining(item) {
			if (this.userInfo.realStatus == '0') {
				return this.$refs.uToast.show({
					title: '实名后方可购买',
					type: 'error'
				});
			}
			this.showModal = true;
			this.currentItem = item;
		},
		showBuy() {
			this.$refs.keyboard.show = true
			this.desc = `支付 ${this.currentItem.price} SUC`
		},
		enterPassword(keyboardValue) {
			this.$api
				.buyMining({
					id: this.currentItem.id,
					status: this.currentItem.status,
					payPw: keyboardValue
				})
				.then(res => {
					console.log(res);
					let { data, code, msg } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '购买成功',
							type: 'success'
						});
						// this.getUserMining();
						this.getMiningUserInfo();
						this.getUserInfo();
						this.$refs.keyboard.handleClose();
					} else {
						this.$refs.uToast.show({
							title: msg,
							type: 'error'
						});
					}
				});
		},
		goToMyMining() {
			uni.navigateTo({
				url: '/pages/mining/mining-my'
			});
		},
		goDetail(id) {
			uni.navigateTo({
				url: `/pages/my/my-newperson-detail?id=${id}`
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
.mining-root {
	padding: 60rpx 32rpx 100rpx;
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
	.my-balance {
		.balance-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #ffffff;
			padding-top: 30rpx;
			box-sizing: border-box;
			height: 342rpx;
			width: 100%;
			background: url(../../static/pledge/header-bg.png) no-repeat center center;
			background-size: 100% 100%;
			font-size: 30rpx;
			.balance-title {
				padding: 0 20rpx;
				font-size: 26rpx;
			}
			.balance-num {
				padding: 20rpx 20rpx 0;
				display: flex;
				justify-content: space-between;
				font-size: 52rpx;
				.unit {
					padding-left: 6rpx;
					font-size: 30rpx;
				}
			}
			.daily-output {
				padding: 20rpx 20rpx 0;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				.unit {
					padding-left: 6rpx;
					font-size: 20rpx;
				}
			}
			.cumulative-output {
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
			}
			.footer {
				margin-top: 20rpx;
				padding: 0 20rpx;
				height: 68rpx;
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-between;
				align-items: center;
				background-color: rgba(0, 0, 0, 0.19);
				font-size: 24rpx;
				font-weight: 400;
				color: #fe9e2c;
				.button {
					width: 128rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #fe9e2c;
					color: #ffffff;
					border-radius: 20rpx;
				}
			}
		}
	}
	.mining-box {
		padding-top: 20rpx;
		.mining-title {
			padding-left: 24rpx;
			font-size: 28rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&::after {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				content: '';
				width: 10rpx;
				height: 30rpx;
				background: -webkit-linear-gradient(225deg, #fe9e2c, #fb402d);
				background: linear-gradient(225deg, #fe9e2c, #fb402d);
				border-radius: 6rpx;
			}
			.right {
				color: rgb(247, 93, 96);
				font-size: 20rpx;
			}
		}
		.mining-list {
			.mining-item {
				margin-top: 30rpx;
				background: #1e1c41;
				border-radius: 12rpx;
				padding: 22rpx;
				height: 290rpx;
				display: flex;
				align-items: center;
				.left {
					image {
						width: 240rpx;
						height: 240rpx;
					}
				}
				.right {
					height: 100%;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.right-title {
						position: relative;
						padding-left: 24rpx;
						font-size: 28rpx;
						&::after {
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							content: '';
							width: 10rpx;
							height: 30rpx;
							background: -webkit-linear-gradient(225deg, #fe9e2c, #fb402d);
							background: linear-gradient(225deg, #fe9e2c, #fb402d);
							border-radius: 6rpx;
						}
					}
					.right-top {
						height: 100%;
						height: 112rpx;
						background: #1b1039;
						border-radius: 12rpx;
						display: -webkit-box;
						display: -webkit-flex;
						display: flex;
						justify-content: space-around;
						align-items: center;
						.right-top-i {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							.right-top-top {
								font-size: 26rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #ced3e1;
							}
							.right-top-bottom {
								font-size: 20rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #5f5874;
							}
						}
					}
					.right-button {
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						color: #ffffff;
						background: linear-gradient(225deg, #fe9e2c, #fb402d);
						border-radius: 30rpx;
						font-size: 32rpx;
					}
				}
			}
		}
	}
}
</style>
