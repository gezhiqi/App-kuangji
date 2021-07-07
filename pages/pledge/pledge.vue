<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>
			<template v-slot:default>
				质押
			</template>
			<template v-slot:right>
				<view>质押规则</view>
			</template>
		</common-title>
		<view class="my-balance">
			<view class="balance-box">
				<view class="balance-title"><text>我的余额</text></view>
				<view class="balance-num">
					<text>0.000</text>
					<text>0</text>
				</view>
				<view class="daily-output">
					<text>每日产出 +0.000</text>
					<text>每日产出 +0</text>
				</view>
				<view class="cumulative-output">
					<text>累计产出 +0.000</text>
					<text>累计产出 +0</text>
				</view>
				<view class="footer">
					<text>总共已质押：0.000DMD</text>
					<view class="button">我的质押</view>
				</view>
			</view>
		</view>
		<view class="pledge-box">
			<view class="pledge-title">
				<text class="left">热门DMD产品</text>
				<text class="right">质押周期均为30天</text>
			</view>
			<view class="pledge-list">
				<view class="pledge-item">
					<view class="item-head">
						<view class="left">3.000</view>
						<view class="right">质押</view>
					</view>
					<view class="item-center">质押数量(DMD)</view>
					<view class="item-footer">
						<view class="footer-i">
							<view class="footer-top">0.001</view>
							<view class="footer-bottom">每日DMD产出</view>
						</view>
						<view class="footer-i">
							<view class="footer-top">1.001</view>
							<view class="footer-bottom">DMD总产量</view>
						</view>
					</view>
				</view>
				<view class="pledge-item">
					<view class="item-head">
						<view class="left">3.000</view>
						<view class="right">质押</view>
					</view>
					<view class="item-center">质押数量(DMD)</view>
					<view class="item-footer">
						<view class="footer-i">
							<view class="footer-top">0.001</view>
							<view class="footer-bottom">每日DMD产出</view>
						</view>
						<view class="footer-i">
							<view class="footer-top">1.001</view>
							<view class="footer-bottom">DMD总产量</view>
						</view>
					</view>
				</view>
				<view class="pledge-item">
					<view class="item-head">
						<view class="left">3.000</view>
						<view class="right">质押</view>
					</view>
					<view class="item-center">质押数量(DMD)</view>
					<view class="item-footer">
						<view class="footer-i">
							<view class="footer-top">0.001</view>
							<view class="footer-bottom">每日DMD产出</view>
						</view>
						<view class="footer-i">
							<view class="footer-top">1.001</view>
							<view class="footer-bottom">DMD总产量</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
				this.statusBarHeight = res.statusBarHeight;
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
