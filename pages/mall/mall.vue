<template>
	<view class="mall-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>商城</common-title>
		<view class="no-data">敬请期待</view>
		<!-- <view class="banner">
			<u-image width="100%" height="270rpx" src="../../static/3.jpg"></u-image>
			<view class="liner"></view>
		</view>

		<view class="content">
			<view class="title">
				<view class="left">
					<u-image
						class="image"
						width="48rpx"
						height="48rpx"
						src="../../static/icon.png"
					></u-image>
					<text>0</text>
				</view>
				<view class="right">质押总数量</view>
			</view>
			<view class="liner"></view>
			<view class="title">
				<view class="left">
					<u-image
						class="image"
						width="48rpx"
						height="48rpx"
						src="../../static/wa.png"
					></u-image>
					<text>1Gh/s</text>
				</view>
				<view class="right">个人总算力</view>
			</view>
			<view class="liner"></view>
			<view class="form">
				<view class="form-item">
					<u-input
						class
						disabled
						border
						placeholder-style="color:#252525;font-size:24rpx"
						placeholder="质押数量"
						height="76"
					/>
				</view>
				<view class="form-item">
					<u-input
						class="form-item-input"
						v-model="num"
						type="text"
						placeholder="请输入质押数量"
						placeholder-style="font-size:24rpx"
						border
						height="76"
					/>
				</view>
				<view class="form-item">
					<u-input
						v-model="value"
						type="select"
						border
						height="76"
						@click="show = true"
						placeholder-style="font-size:24rpx"
					/>
					<u-action-sheet
						:list="actionSheetList"
						v-model="show"
						@click="actionSheetCallback"
					></u-action-sheet>
				</view>
				<view class="form-item"><view class="sure-btn">确定存入</view></view>
			</view>
			<view class="desc">
				温馨提示：质押池内最多不能超过3笔质押，请注意合理安排质押次数。
			</view>
			<view class="liner"></view>
		</view>
		<view class="pledge">
			<view class="pledge-title">质押列表</view>
			<view class="pledge-list">
				<view class="list-item">
					<view>0</view>
					<view class="color-9">数量</view>
				</view>
				<view class="list-item">
					<view>1.00</view>
					<view class="color-9">算力</view>
				</view>
				<view class="list-item">
					<view>2.1344</view>
					<view class="color-9">收益</view>
				</view>
				<view class="list-item list-item-big">
					<view><text class="color-9">开始</text>05-15 20:20:08</view>
					<view><text class="color-9">结束</text>05-15 20:20:08</view>
				</view>
				<view class="list-item list-item-last"><view>退出</view></view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			// num: '',
			// value: 'WMO',
			// show: false,
			// actionSheetList: [
			// 	{
			// 		text: 'WMO'
			// 	},
			// 	{
			// 		text: 'BTC'
			// 	},
			// 	{
			// 		text: 'USTD'
			// 	}
			// ],
			statusBarHeight: 0,
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				that.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	methods: {
		// actionSheetCallback(index) {
		// 	this.value = this.actionSheetList[index].text;
		// }
	}
};
</script>

<style lang="scss">
// .mall {
// 	padding: 0 30rpx;
// 	.liner {
// 		height: 20rpx;
// 		background: #fbfbfb;
// 		margin-top: 40rpx;
// 		margin-left: -30rpx;
// 		margin-right: -30rpx;
// 	}
// 	.title {
// 		padding-top: 40rpx;
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		.left {
// 			display: flex;
// 			align-items: center;
// 			.image {
// 				margin-right: 20rpx;
// 			}
// 		}
// 		.right {
// 			font-size: 24rpx;
// 		}
// 	}
// 	.form {
// 		display: flex;
// 		align-items: center;
// 		font-size: 26rpx;
// 		::v-deep .u-input__right-icon {
// 			display: flex;
// 			align-items: center;
// 		}
// 		.form-item {
// 			::v-deep input {
// 				font-size: 24rpx;
// 			}
// 		}
// 		.form-item-input {
// 			width: 200rpx;
// 		}
// 		.sure-btn {
// 			background-color: #009688;
// 			height: 78rpx;
// 			line-height: 78rpx;
// 			text-align: center;
// 			width: 152rpx;
// 			color: #fff;
// 			white-space: nowrap;
// 			font-size: 28rpx;
// 		}
// 	}
// 	.desc {
// 		color: #999;
// 		margin-top: 20rpx;
// 		font-size: 24rpx;
// 	}
// 	.pledge {
// 		.pledge-title {
// 			font-size: 36rpx;
// 			font-weight: 700;
// 			line-height: 100rpx;
// 			height: 100rpx;
// 			width: 160rpx;
// 			&::after {
// 				content: '';
// 				display: block;
// 				height: 12rpx;
// 				background: linear-gradient(
// 					270deg,
// 					rgba(1, 197, 127, 0.2) 0%,
// 					rgba(12, 199, 133, 0.7) 100%
// 				);
// 				margin-top: -40rpx;
// 			}
// 		}
// 		.pledge-list {
// 			display: flex;
// 			.color-9 {
// 				color: #999999;
// 			}
// 			.list-item {
// 				font-size: 24rpx;
// 				flex: 2;
// 			}
// 			.list-item-big {
// 				flex: 5;
// 			}
// 			.list-item-last {
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 				view {
// 					padding: 0 20rpx;
// 					height: 64rpx;
// 					line-height: 62rpx;
// 					background-color: #00c57f;
// 					color: #ffffff;
// 				}
// 			}
// 		}
// 	}
// }
uni-page-body,
body{
	height: 100%;
	
}
.mall-root {
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
