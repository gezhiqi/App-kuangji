<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				我的质押
			</template>
		</common-title>
		<!-- style="{height: `calc(100vh-${statusBarHeight}- 40`}" -->
		<view class="pledge-box">
			<u-tabs-swiper
				ref="tabs"
				:list="list"
				:current="current"
				@change="tabsChange"
				:is-scroll="false"
				inactive-color="#ced3e1"
				active-color="#f29100"
				bg-color="#1e1c41"
			></u-tabs-swiper>
			<swiper :current="current" class="swiper-box">
				<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
					<view v-for="(v, i) in item" :key="v.id">
						<view class="pledge-item">
							<view class="item-head">
								<view class="left">{{ v.pledgeNumber }}</view>
								<view class="right" @click="buyPledge(v.id)">质押</view>
							</view>
							<view class="item-center">
								<text class="left">质押数量(DMD)</text>
								<text class="right">质押周期{{ v.rate }}天</text>
							</view>
							<view class="item-footer">
								<view class="footer-i">
									<view class="footer-top">{{ v.output }}</view>
									<view class="footer-bottom">每日DMD产出</view>
								</view>
								<view class="footer-i">
									<view class="footer-top">{{ v.totalOutput }}</view>
									<view class="footer-bottom">DMD总产量</view>
								</view>
							</view>
						</view>
					</view>
					<view class="no-data" v-show="item.length === 0">
						<image mode="aspectFit" src="../../static/pledge/noData.png"></image>
						<view class="desc">暂无数据</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<u-toast ref="uToast" />

	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			swiperCurrent: 0,
			showModal: false,
			list: [
				{
					name: '全部',
					count: 9,
					noData: false
				},
				{
					name: '质押中',
					count: 0,
					noData: false
				},
				{
					name: '已结算',
					count: 0,
					noData: false
				}
			],
			swiperList: [[], [], []]
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.pledgeDetailList();
	},
	methods: {
		pledgeDetailList() {
			if (this.swiperList[this.current].length > 0 || this.list[this.current].noData) {
				return false;
			}
			uni.showLoading({
				title: '正在加载'
			});
			this.$api.pledgeDetail({ status: this.current }).then(res => {
				let { data, code,total,locking,unlocking } = res.data;
				if (code === 200) {
					uni.hideLoading();
					this.swiperList[this.current] = data;
					if (this.swiperList[this.current].length == 0) {
						this.list[this.current].noData = true;
					}
					this.list[0].count = total
					this.list[1].count = locking
					this.list[2].count = unlocking
					this.$forceUpdate();
				}else{
					uni.hideLoading();
				}
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.current = index;
			this.pledgeDetailList();
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
	padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.pledge-box {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 80px);
		.swiper-box {
			flex: 1;
			.swiper-item {
				overflow-y: auto;
				.no-data {
					display: flex;
					flex-direction: column;
					align-items: center;
					image {
						margin-top: 100rpx;
						width: 400rpx;
					}
				}
				.pledge-item {
					margin-top: 30rpx;
					background: #1e1c41;
					border-radius: 12rpx;
					padding: 22rpx;
					box-sizing: border-box;
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
							opacity: 0.54;
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
}
</style>
