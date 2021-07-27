<template>
	<view :ref="`ref${0}`" class="my-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>
			<template v-slot:default>
				交易
			</template>
			<template v-slot:right>
				交易说明
			</template>
		</common-title>
		<view class="transacte-box">
			<view class="charts-box">
				<qiun-data-charts
					type="line"
					:chartData="chartData"
					:opts="opts"
					:onmovetip="true"
					:ontouch="true"
				/>
			</view>
			<view class="create-order">
				<view class="create-order-title">购买意向</view>
				<view class="create-order-list-box">
					<view class="create-order-list">
						<view
							class="item"
							:class="{ active: activeCurrent === index }"
							v-for="(item, index) in priceList"
							:key="index"
							@click="activeCurrent = index"
						>
							{{ item }}
						</view>
					</view>
					<view class="create-order-btn" @click="createOrder">确认购买</view>
				</view>
			</view>
			<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback" :up="upOption">
				<view class="list">
					<view class="list-title">订单列表</view>
					<view class="list-box">
						<view class="list-item" v-for="item in orderList" :key="item.id">
							<view class="item-top">
								<view class="item-title">买方信息：{{ item.telephone }}</view>
							</view>
							<view class="item-bottom">
								<view class="left">
									<view class="tips">数量：{{ item.num }}</view>
									<view class="price">价格￥{{ item.price }}</view>
								</view>
								<view class="right">
									<view class="r-top">单价</view>
									<view class="r-bot">{{ item.unitPrice }}</view>
								</view>
							</view>
							<view class="item-footer">
								<view @click="showSellPop(item.id)">出售</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<u-modal
			v-model="showModal"
			:show-cancel-button="true"
			content="确认发布购买订单"
			@cancel="showModal = false"
			@confirm="showBuy"
		></u-modal>
		<u-modal
			v-model="showSell"
			:show-cancel-button="true"
			content="确认发布购买订单"
			@cancel="showSell = false"
			@confirm="showSellFunc"
		></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
let opts = {
	// X轴设置
	tapLegend: false,
	enableScroll: false,
	xAxis: {
		disableGrid: true,
		axisLine: false
	},
	yAxis: {
		disableGrid: true,
		axisLine: false,
		splitNumber: 1
	},
	legend: {
		show: false,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	dataPointShape: false,
	dataLabel: false,
	fontSize: 11,
	rotateLabel: true,
	legend: false,
	extra: {
		tooltip: {
			// horizentalLine: true
		}
	}
};
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			statusBarHeight: 0,
			index: 0,
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			chartData: {
				categories: [],
				series: [
					{
						name: '价格',
						data: []
					}
				]
			},
			opts: opts,
			orderList: [],
			priceList: [10, 20, 50, 100, 200],
			activeCurrent: '',
			showModal: false,
			showSell:false,
			currentSellId:''
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getPriceTrend();
	},
	methods: {
		getPriceTrend() {
			this.$api.priceTrend().then(res => {
				let { data, code } = res.data;
				if (code === 200) {
					this.chartData.series[0].data = data.map(item => {
						return item.price;
					});
					this.chartData.categories = data.map(item => {
						return item.month + '-' + item.day;
					});
				}
			});
		},
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条

			console.log(pageNum, pageSize, this.morningCode);

			this.$api
				.orderList({
					currPage: pageNum,
					pageSize: pageSize,
					playCode: this.morningCode
				})
				.then(res => {
					console.log('订单列表', res);
					if (res.data.code === 200) {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.data.total / 10;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						let hasNext = curPageData.length < 10 ? false : true;

						//设置列表数据
						if (page.num == 1) this.orderList = []; //如果是第一页需手动置空列表
						this.orderList = this.orderList.concat(curPageData); //追加新数据

						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);

						setTimeout(() => {
							this.mescroll.endSuccess(curPageLen);
						}, 20);
					}
				})
				.catch(err => {});
		},
		// 打开订单弹窗
		createOrder() {
			this.showModal = true;
		},
		// 创建订单
		showBuy() {
			this.$api
				.createOrder({
					num: this.priceList[this.activeCurrent]
				})
				.then(res => {
					if (res.data.code === 200) {
						this.$refs.uToast.show({
							title: '创建成功',
							type: 'success'
						});
						this.downCallback()
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error'
						});
					}
				});
		},
		showSellPop(id) {
			this.showSell = true
			this.currentSellId = id
		},
		showSellFunc() {
			this.sellMoney()
		},
		sellMoney() {
			this.$api
				.sellCancel(this.currentSellId)
				.then(res => {
					if (res.data.code === 200) {
						this.$refs.uToast.show({
							title: '匹配成功，请及时付款',
							type: 'success'
						});
						this.downCallback()
					}else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error'
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
.my-root {
	padding: 60rpx 30rpx 120rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.charts-box {
		height: 500rpx;
	}
	.create-order {
		border-radius: 16rpx;
		.create-order-title {
			padding-left: 24rpx;
			font-size: 32rpx;
			position: relative;
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
		.create-order-list-box {
			margin-top: 20rpx;
			padding: 40rpx 10rpx;
			background-color: #1e1c41;
			border-radius: 16rpx;
		}
		.create-order-list {
			display: flex;
			justify-content: space-around;
			.item {
				width: 110rpx;
				height: 60rpx;
				background-color: #ffffff;
				color: #333333;
				border-radius: 10rpx;
				font-size: 20rpx;
				text-align: center;
				line-height: 63rpx;
				border: 0.3rpxsolid #e8e8e8;
				// #fb402d
				&.active {
					height: 60rpx;
					line-height: 60rpx;
					position: relative;
					background: #c067f6;
					&::before {
						content: '';
						width: 30rpx;
						height: 30rpx;
						position: absolute;
						bottom: 0;
						right: 0;
						background: url(../../static/img/active.png) no-repeat center center;
						background-size: 30rpx 30rpx;
					}
				}
			}
		}
		.create-order-btn {
			margin: 40rpx auto 0;
			width: 600rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			text-align: center;
			color: #ffffff;
			font-size: 32rpx;
			background: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
		}
	}
	#annualized-chart {
		padding-top: 0.3rem;
		height: 500rpx;
		width: 100%;
	}
	.list {
		margin-top: 40rpx;

		.list-title {
			padding-left: 24rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
			position: relative;
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
		.list-box {
			background-color: #1e1c41;
			padding: 20rpx 10rpx;
			border-radius: 16rpx;
			.list-item {
				padding: 10rpx;
				border-bottom: 0.5px solid rgba(204, 204, 204, 0.2);
				.item-title {
					font-size: 28rpx;
					line-height: 58rpx;
					color: #8d57fc;
				}
				.item-bottom {
					display: flex;
					justify-content: space-between;
					.left {
						font-size: 24rpx;
						line-height: 46rpx;
						.price {
							line-height: 60rpx;
						}
					}
					.right {
						font-size: 24rpx;
						line-height: 46rpx;
						color: #c067f6;
						.r-bot {
							font-size: 42rpx;
							line-height: 60rpx;
						}
					}
				}
				.item-footer {
					display: flex;
					flex-direction: row-reverse;
					padding: 10rpx 0;
					view {
						width: 120rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 28rpx;
						border-radius: 30rpx;
						background: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
					}
				}
			}
		}
	}
}
</style>
