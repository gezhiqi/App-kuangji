<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>
			<template v-slot:default>
				矿机
			</template>
			<template v-slot:right>
				矿机说明
			</template>
		</common-title>
<view class="my-balance">
			<view class="balance-box">
				<view class="balance-title"><text>我的矿机</text></view>
				<view class="balance-num">
					<text>{{ miningNum }}</text>
				</view>
				<view class="daily-output">
					<text>每日产出 +{{ dailyIncome }}</text>
					<text>每日产出 +{{ dailyIncome }}</text>
				</view>
				<view class="cumulative-output">
					<text>累计产出 +{{ totalIncome }}</text>
					<text>累计产出 +{{ totalIncome }}</text>
				</view>
				<view class="footer">
					<text>总共已质押：{{ totalPledge }}DMD</text>
					<view class="button" @click="goToMyPledge">我的矿机</view>
				</view>
			</view>
		</view>
		<view class="pledge-box">
			<view class="pledge-title">
				<text class="left">热门矿机产品</text>
				<text class="right">矿机周期均为30天</text>
			</view>
			<view class="pledge-list">
				<view class="pledge-item" v-for="item in miningList">
					<view class="left"><image :src="item.imageUrl" mode="aspectFit"></image></view>
					<view class="right">
						<view class="right-title">矿机名称：{{ item.title }}</view>
						<view class="right-top">
							<view class="right-top-i">
								<view class="right-top-top">{{ item.price }}</view>
								<view class="right-top-bottom">框架价格</view>
							</view>
							<view class="right-top-i">
								<view class="right-top-top">{{ item.rate }}</view>
								<view class="right-top-bottom">收益率</view>
							</view>
							<view class="right-top-i">
								<view class="right-topr-top">{{ item.output }}</view>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			miningList: [],
			showModal: false,
			currentItem:{},
			miningNum:0,
			dailyIncome:0,
			totalIncome:0
			
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getMiningList();
		this.getUserMining()
	},
	methods: {
		getMiningList() {
			this.$api.miningList().then(res => {
				console.log(res)
				let { data, code } = res.data;
				if (code === 200) {
					this.miningList = data;
				}
			});
		},
		getUserMining() {
			this.$api.userMining().then(res => {
				console.log(res)
				let { data, code } = res.data;
				if (code === 200) {
					this.miningNum = data.length
				}
			});
		},
		buyMining(item) {
			this.showModal = true
			this.currentItem = item
		},
		showBuy() {
			this.$api.buyMining({
				id:this.currentItem.id,
				status:this.currentItem.status,
			}).then(res => {
				console.log(res)
				let { data, code } = res.data;
				if (code === 200) {
					this.$refs.uToast.show({
						title: '购买成功',
						type: 'success'
					});
				}
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
					}
				}
			}
		}
	}
}
</style>
