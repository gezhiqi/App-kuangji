<template>
	<view class="mining-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				我的矿机
			</template>
		</common-title>
		<!-- style="{height: `calc(100vh-${statusBarHeight}- 40`}" -->
		<view class="mining-box">
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
			<view class="one-key" v-show="!this.list[this.current].noData">
				<view class="one-key-box">
					<u-button type="primary" size="mini" @click="oneKeyOpen">一键开启</u-button>
					<u-button type="primary" size="mini" @click="oneKeyIncome">一键收益</u-button>
				</view>
				<view class="one-key-desc">操作：</view>
			</view>
			<swiper :current="current" @change="swiperChange" class="swiper-box">
				<swiper-item class="swiper-item">
					<view v-for="(v, i) in allList" :key="v.id">
						<view class="mining-item">
							<view class="left">
								<image :src="v.imageUrl" mode="aspectFit"></image>
							</view>
							<view class="right">
								<view class="right-title">矿机名称：{{ v.title }}</view>
								<view class="right-top">
									<view class="right-top-i">
										<view class="right-top-top">{{ v.price }}</view>
										<view class="right-top-bottom">价格</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.output || 0 }}</view>
										<view class="right-top-bottom">日产出</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.revenue }}</view>
										<view class="right-top-bottom">已产出</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.totalRevenue }}</view>
										<view class="right-top-bottom">预计总产出</view>
									</view>
								</view>
								<view class="right-footer">
									<view class="left">
										{{ v.flag ? '已开启：' : '未开启：' }}
										<u-switch
											@change="changeSwitch($event, v)"
											size="30"
											v-model="v.flag"
										></u-switch>
									</view>
									<u-button type="primary" size="mini" @click="receiveIncome(v)">
										领取收益
									</u-button>
								</view>
							</view>
						</view>
					</view>
					<view class="no-data" v-show="allList.length === 0">
						<image mode="aspectFit" src="../../static/pledge/noData.png"></image>
						<view class="desc">暂无数据</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view v-for="(v, i) in runList" :key="v.id">
						<view class="mining-item">
							<view class="left">
								<image :src="v.imageUrl" mode="aspectFit"></image>
							</view>
							<view class="right">
								<view class="right-title">矿机名称：{{ v.title }}</view>
								<view class="right-top">
									<view class="right-top-i">
										<view class="right-top-top">{{ v.price }}</view>
										<view class="right-top-bottom">价格</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.output }}</view>
										<view class="right-top-bottom">日产出</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.revenue }}</view>
										<view class="right-top-bottom">已产出</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.totalRevenue }}</view>
										<view class="right-top-bottom">预计总产出</view>
									</view>
								</view>
								<view class="right-footer">
									<view class="left">
										{{ v.flag ? '已开启：' : '未开启：' }}
										<u-switch @change="changeSwitch($event, v)" size="30" v-model="v.flag"></u-switch>
									</view>
									<u-button type="primary" size="mini" @click="receiveIncome(v)">领取收益</u-button>
								</view>
							</view>
						</view>
					</view>
					<view class="no-data" v-show="runList.length === 0">
						<image mode="aspectFit" src="../../static/pledge/noData.png"></image>
						<view class="desc">暂无数据</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<!-- runList stopList -->
					<view v-for="(v, i) in stopList" :key="v.id">
						<view class="mining-item">
							<view class="left">
								<image :src="v.imageUrl" mode="aspectFit"></image>
							</view>
							<view class="right">
								<view class="right-title">矿机名称：{{ v.title }}</view>
								<view class="right-top">
									<view class="right-top-i">
										<view class="right-top-top">{{ v.price }}</view>
										<view class="right-top-bottom">价格</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.output }}</view>
										<view class="right-top-bottom">日产出</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.revenue }}</view>
										<view class="right-top-bottom">已产出</view>
									</view>
									<view class="right-top-i">
										<view class="right-top-top">{{ v.totalRevenue }}</view>
										<view class="right-top-bottom">预计总产出</view>
									</view>
								</view>
								<view class="right-footer">
									<view class="left">
										<!-- 已结束
										<u-switch :disabled="true" size="30" v-model="v.flag"></u-switch> -->
									</view>
									<u-button size="mini">
										已结算
									</u-button>
								</view>
							</view>
						</view>
					</view>
					<view class="no-data" v-show="stopList.length === 0">
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
			loading: false,
			list: [
				{
					name: '全部',
					count: 9,
					noData: false
				},
				{
					name: '运行中',
					count: 0,
					noData: false
				},
				{
					name: '已结束',
					count: 0,
					noData: false
				}
			],
			swiperList: [[], [], []],
			allList: [],
			runList: [],
			stopList: []
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.userMining();
	},
	methods: {
		userMining() {
			// if (this.swiperList[this.current].length > 0 || this.list[this.current].noData) {
			// 	return false;
			// }
			uni.showLoading({
				title: '正在加载'
			});
			let obj = ['', '1', '2'];
			this.$api.userMining({ status: obj[this.current] }).then(res => {
				let { data, code, total, runCount, stopCount } = res.data;
				if (code === 200) {
					uni.hideLoading();
					this.swiperList[this.current] = data;
					if (this.current === 0) {
						this.allList = data;
					}
					if (this.current === 1) {
						this.runList = data;
					}
					if (this.current === 2) {
						this.stopList = data;
					}
					if (this.swiperList[this.current].length == 0) {
						this.list[this.current].noData = true;
					}
					this.list[0].count = total;
					this.list[1].count = runCount;
					this.list[2].count = stopCount;
					this.$forceUpdate();
				} else {
					uni.hideLoading();
				}
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.current = index;
			this.userMining();
		},
		swiperChange(e) {
			this.current = e.detail.current;
			this.userMining();
		},
		// 矿机开启
		changeSwitch(val, v) {
			console.log(val);
			if (!val) {
				v.flag = true;
			} else {
				this.$api.openMining({ id: v.id }).then(res => {
					let { data, code, msg } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '启动成功',
							type: 'success'
						});
						this.userMining();
					} else {
						this.$refs.uToast.show({
							title: msg,
							type: 'info'
						});
					}
				});
			}
		},

		// 领取收益
		receiveIncome(v) {
			this.$api.receiveIncome({ id: v.id }).then(res => {
				let { data, code, msg } = res.data;
				if (code === 200) {
					this.$refs.uToast.show({
						title: '领取成功',
						type: 'success'
					});
					this.userMining();
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'info'
					});
				}
			});
		},
		// 一键开启
		oneKeyOpen() {
			this.$api.openMining().then(res => {
				let { data, code, msg } = res.data;
				if (code === 200) {
					this.$refs.uToast.show({
						title: '开启成功',
						type: 'success'
					});
					// debugger
					this.clear();
					this.userMining();
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'info'
					});
				}
			});
		},
		// 一键收益
		oneKeyIncome() {
			this.$api.receiveIncome().then(res => {
				let { data, code, msg } = res.data;
				if (code === 200) {
					this.$refs.uToast.show({
						title: '收取成功',
						type: 'success'
					});
					this.clear();
					this.userMining();
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'info'
					});
				}
			});
		},
		clear() {
			this.swiperList[this.current] = [];
			this.list[this.current].noData = false;
		}
	}
};
</script>

<style lang="scss">
uni-page-body,
body {
	height: 100%;
}
// .custom-style {
// 	color: #f29100;;
// }
.mining-root {
	padding: 0 32rpx;
	// padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.mining-box {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 88px);
		.one-key {
			margin-top: 30rpx;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			.one-key-box {
				width: 320rpx;
				display: flex;
				justify-content: space-around;
			}
			.one-key-desc {
				font-size: 30rpx;
				color: rgb(242, 145, 0);
			}
		}
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
						.right-footer {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 60rpx;
							font-size: 28rpx;
							.left {
								font-size: 28rpx;
								display: flex;
								align-items: center;
							}
							.u-btn {
								margin: 0;
								width: 136rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>
