<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="root-title">
			<view>质押</view>
			<view class="right" @click="goDetail('4d4a1364-e62a-11eb-8e3b-52540029ab15')">质押规则</view>
		</view>
		<view class="my-balance">
			<view class="balance-box">
				<view class="balance-title"><text>质押总价值</text></view>
				<view class="balance-num">
					<text>
						{{ totalPrice }}
						<text class="unit">CNY</text>
					</text>
					<!-- <text>0</text> -->
				</view>
				<view class="daily-output">
					<text>每日产出 +{{ dailyIncome }} SUC</text>
					<!-- <text>每日产出 +{{ dailyIncome }}</text> -->
				</view>
				<view class="cumulative-output">
					<text>累计产出 +{{ totalIncome }} SUC</text>
					<!-- <text>累计产出 +{{ totalIncome }}</text> -->
				</view>
				<view class="footer">
					<text>总共已质押：{{ totalPledge }} SUC</text>
					<view class="button" @click="goToMyPledge">我的质押</view>
				</view>
			</view>
		</view>
		<view class="pledge-box">
			<view class="pledge-title">
				<text class="left">热门质押产品</text>
				<!-- <text class="right">质押周期均为30天</text> -->
			</view>
			<view class="pledge-list">
				<view class="pledge-item" v-for="item in pledgeList">
					<view class="item-head">
						<view class="left">{{ item.pledgeNumber }}</view>
						<view class="right" @click="buyPledge(item.id, item.pledgeNumber)">
							质押
						</view>
					</view>
					<view class="item-center">
						<text class="left">质押数量(SUC)</text>
						<text class="right">质押周期{{ item.cycle }}天</text>
					</view>
					<view class="item-footer">
						<view class="footer-i">
							<view class="footer-top">{{ item.output }}</view>
							<view class="footer-bottom">每日SUC产出</view>
						</view>
						<view class="footer-i">
							<view class="footer-top">{{ item.totalOutput }}</view>
							<view class="footer-bottom">SUC总产量</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal
			v-model="showModal"
			:show-cancel-button="true"
			content="确定质押本产品"
			@cancel="showModal = false"
			@confirm="showBuy"
		></u-modal>
		<keyboard ref="keyboard" @complete="enterPassword" :desc="desc"></keyboard>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import keyboard from '../../components/keyboard/keyboard.vue';
export default {
	data() {
		return {
			statusBarHeight: 0,
			pledgeList: [],
			showModal: false,
			currentId: '',
			totalIncome: 0,
			dailyIncome: 0,
			totalPledge: 0,
			totalPrice: 0,
			currentNum: 0,
			desc: ''
		};
	},
	components: {
		keyboard
	},
	computed: {
		...mapState(['userInfo'])
	},
	onShow() {
		this.getPledgeList();
		this.userPledge();
		this.getUserInfo();
	},
	onPullDownRefresh() {
		this.getPledgeList();
		this.userPledge();
		this.getUserInfo();
		setTimeout(() => {
			uni.stopPullDownRefresh();
			this.$refs.uToast.show({
				title: '刷新成功',
				type: 'success',
			});
		}, 1000);
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
		// 质押列表
		getPledgeList() {
			this.$api.getPledgeList().then(res => {
				let { data, code } = res.data;
				if (code === 200) {
					this.pledgeList = data;
				}
			});
		},

		// 用户质押详情
		userPledge() {
			this.$api.userPledge().then(res => {
				console.log(123, res);
				let { data, code } = res.data;
				if (code === 200) {
					this.totalIncome = data.produceOutput;
					this.dailyIncome = data.totalOutput;
					this.totalPledge = data.totalPledgeNumber;
					this.totalPrice = data.totalPrice;
				}
			});
		},
		buyPledge(id, num) {
			if (this.userInfo.realStatus == '0') {
				return this.$refs.uToast.show({
					title: '实名后方可质押',
					type: 'error'
				});
			}
			this.currentNum = num;
			this.currentId = id;
			this.showModal = true;
		},
		showBuy() {
			this.$refs.keyboard.show = true;
			this.desc = `质押 ${this.currentNum} SUC`;
		},
		enterPassword(keyboardValue) {
			this.$api.buyPledge({ pledgeId: this.currentId, payPw: keyboardValue }).then(res => {
				let { data, code, msg } = res.data;
				if (code === 200) {
					this.$refs.uToast.show({
						title: '质押成功',
						type: 'success'
					});
					this.userPledge();
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
		goToMyPledge() {
			uni.navigateTo({
				url: '/pages/pledge/pledge-my'
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
.pledge-root {
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
	.pledge-box {
		padding-top: 20rpx;
		.pledge-title {
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
		.pledge-list {
			.pledge-item {
				margin-top: 30rpx;
				background: #1e1c41;
				border-radius: 12rpx;
				padding: 22rpx;
				.item-head {
					display: flex;
					justify-content: space-between;
					.left {
						font-size: 44rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ced3e1;
						line-height: 60rpx;
					}
					.right {
						width: 120rpx;
						height: 52rpx;
						background: #3c78fa;
						border-radius: 28rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #fff;
						line-height: 52rpx;
						text-align: center;
					}
				}
				.item-center {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5f5874;
					line-height: 34rpx;
					display: flex;
					justify-content: space-between;
					.right {
						color: #f75d60;
					}
				}
				.item-footer {
					margin-top: 18rpx;
					height: 112rpx;
					background: #1b1039;
					border-radius: 0px 8rpx 8rpx 8rpx;
					display: -webkit-box;
					display: -webkit-flex;
					display: flex;
					justify-content: space-around;
					.footer-i {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.footer-top {
							font-size: 32rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #ced3e1;
						}
						.footer-bottom {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #5f5874;
						}
					}
				}
			}
		}
	}
}
</style>
