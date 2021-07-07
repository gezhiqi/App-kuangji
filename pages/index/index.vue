<template>
	<view class="index-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>首页</common-title>
		<view class="wrap"><u-swiper height="340" :list="swiperList"></u-swiper></view>
		<view class="notice">
			<swiper
				class="swiper"
				:indicator-dots="indicatorDots"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
				:vertical="vertical"
				:circular="true"
			>
				<swiper-item class="swiper-item">
					<u-image
						width="32rpx"
						height="26rpx"
						src="../../static/index/notice.png"
					></u-image>
					<view class="swiper-desc">关于封号问题简述</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<u-image
						width="32rpx"
						height="26rpx"
						src="../../static/index/notice.png"
					></u-image>
					<view class="swiper-desc">重启交易项目</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<u-image
						width="32rpx"
						height="26rpx"
						src="../../static/index/notice.png"
					></u-image>
					<view class="swiper-desc">789</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="module-box">
			<div class="module-row">
				<view class="module" v-for="(item, index) in moduleList1" :key="index">
					<u-image width="84rpx" height="84rpx" :src="item.url"></u-image>
					<view class="module-desc">{{ item.title }}</view>
				</view>
			</div>
			<div class="module-row row2">
				<view class="module" v-for="(item, index) in moduleList2" :key="index">
					<u-image width="84rpx" height="84rpx" :src="item.url"></u-image>
					<view class="module-desc">{{ item.title }}</view>
				</view>
			</div>
		</view>
		<view class="my-assets">
			<view class="title">
				<text>我的资产</text>
				<text class="title-desc">USDT/DMD/EOS价格来源：OK交易所</text>
			</view>
			<view class="my-assets-body">
				<view class="top">总资产折合(CNY)</view>
				<view class="center">0.00</view>
				<view class="footer">
					<view class="item">
						<view class="currency">DMD/CNY</view>
						<view class="exchange-a">0.000</view>
						<view class="exchange-b">￥0.00</view>
					</view>
					<view class="item">
						<view class="currency">ESO/CNY</view>
						<view class="exchange-a">0.000</view>
						<view class="exchange-b">￥0.00</view>
					</view>
					<view class="item">
						<view class="currency">USDT/CNY</view>
						<view class="exchange-a">0.000</view>
						<view class="exchange-b">￥0.00</view>
					</view>
				</view>
				<view class="last-desc">
					<view>当前价格：DMD 1枚 ≈255.17 CNY | EOS 1枚 ≈25.77 CNY</view>
					<view>USDT 1枚 ≈6.46 CNY</view>
				</view>
			</view>
		</view>
		<view class="asset-ranking">
			<view class="ranking-title">个人资产排行</view>
			<view class="ranking-list">
				<view class="list-title">
					<view class="rank">排名</view>
					<view class="head">头像</view>
					<view class="user">用户名</view>
					<view class="assets">资产(元)</view>
				</view>
				<view class="list">
					<view class="list-row" v-for="(item,index) in 10" :key="index">
						<view class="item-rank">{{index+1}}</view>
						<view class="item-head">
							<u-image
								height="48rpx"
								width="48rpx"
								src="../../static/head.png"
							></u-image>
						</view>
						<view class="item-user">xxxx</view>
						<view class="item-assets">1111.00</view>
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			titleHeight: 0,
			title: 'Hello',
			indicatorDots: false,
			autoplay: true,
			vertical: true,
			interval: 5000,
			duration: 500,
			swiperList: [],
			moduleList1: [
				{
					title: '签到',
					url: require('../../static/index/module-img1.png')
				},
				{
					title: '邀请',
					url: require('../../static/index/module-img2.png')
				},
				{
					title: '充币',
					url: require('../../static/index/module-img3.png')
				},
				{
					title: '提币',
					url: require('../../static/index/module-img4.png')
				}
			],
			moduleList2: [
				{
					title: '闪兑',
					url: require('../../static/index/module-img5.png')
				},
				{
					title: '公会',
					url: require('../../static/index/module-img6.png')
				},
				{
					title: '公会榜',
					url: require('../../static/index/module-img7.png')
				},
				{
					title: '团队',
					url: require('../../static/index/module-img8.png')
				}
			]
		};
	},

	created() {
		let that = this;
		uni.getSystemInfo({
			success: res => {
				that.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getTabbarList();
	},

	
	// onLoad() {
	// 	var loginRes = this.checkLogin();
	// 	if (!loginRes) {
	// 		return false;
	// 	}
	// },
	methods: {
		getTabbarList() {
			this.$api.getTabbarList().then(res => {
				let { data, code } = res.data;
				if (code === 200) {
					this.swiperList = data.map(item => {
						return item.imageUrl;
					});
				}
			});
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
body {
	height: 100%;
}
.index-root {
	padding: 60rpx 32rpx 100rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.swiper {
		height: 60rpx;
		.swiper-item {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			.swiper-desc {
				padding-left: 20rpx;
			}
		}
	}
	.module-box {
		.module-row {
			display: flex;
			justify-content: space-between;
			&.row2 {
				padding-top: 8rpx;
			}
		}
		.module {
			display: flex;
			flex-direction: column;
			align-items: center;
			.module-desc {
				font-size: 26rpx;
			}
		}
	}
	.my-assets {
		padding-top: 40rpx;
		.title {
			padding-left: 24rpx;
			font-size: 28rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
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
			.title-desc {
				color: #5f5874;
				font-size: 24rpx;
			}
		}
		.my-assets-body {
			margin-top: 22rpx;
			background-color: #1e1c41;
			text-align: center;
			.top {
				padding-top: 20rpx;
				color: #5f5874;
				font-size: 28rpx;
				line-height: 40rpx;
			}
			.center {
				padding-top: 4rpx;
				color: #3c78fa;
				line-height: 80rpx;
				font-size: 56rpx;
			}
			.footer {
				display: flex;
				justify-content: space-around;
				padding: 14rpx 0px;
				border-top: 1rpx solid rgb(32, 38, 67);
				border-bottom: 1px solid rgb(32, 38, 67);
				margin: 10rpx 0px;
				.item {
					font-size: 24rpx;
					font-weight: 400;
					.currency {
						color: #ced3e1;
					}
					.exchange-a {
						color: #3c78fa;
					}
					.exchange-b {
						font-size: 20rpx;
						color: #5f5874;
					}
				}
			}
			.last-desc {
				padding-bottom: 20rpx;
				color: #5f5874;
				line-height: 32rpx;
				text-align: center;
				font-size: 22rpx;
			}
		}
	}
	.asset-ranking {
		margin-top: 30rpx;
		.ranking-title {
			padding-left: 24rpx;
			font-size: 28rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
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
			.title-desc {
				padding-top: 30rpx;
				color: #5f5874;
				font-size: 24rpx;
			}
		}
		.ranking-list {
			padding: 24rpx 0;
			.list-title {
				display: flex;
				font-weight: 400;
				color: #5f5874;
				line-height: 34rpx;
				text-align: center;
				font-size: 24rpx;
				.rank,
				.head {
					flex: 1;
				}
				.user,
				.assets {
					flex: 2;
				}
			}
			.list {
				.list-row {
					padding-top: 20rpx;
					display: flex;
					.item-rank,
					.item-head {
						flex: 1;
						display: flex;
						justify-content: center;
					}
					.item-user,
					.item-assets {
						flex: 2;
						display: flex;
						justify-content: center;
					}
				}
			}
		}
	}
}
</style>
