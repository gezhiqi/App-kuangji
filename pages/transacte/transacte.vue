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
				<view class="create-order-btn">确认购买</view>
			</view>
			<mescroll-body ref="mescrollRef" @down="downCallback" @up="upCallback" :up="upOption">
				<view class="list">
					<view class="list-item" v-for="item in orderList" :key="item.id">
						<view class="tips">{{ item.num }}</view>
						<view class="price">￥{{ item.price }}</view>
					</view>
				</view>
			</mescroll-body>
		</view>

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
			activeCurrent: ''
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
		padding: 30rpx 10rpx;
		background-color: #1e1c41;
		.create-order-title {
			padding-left: 24rpx;
			font-size: 28rpx;
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
		.create-order-list {
			margin-top: 40rpx;
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
				    border: .3rpxsolid #e8e8e8;
				// #fb402d
				&.active {
					height: 60rpx;
					line-height: 60rpx;
					border: 3rpx solid #8d57fc;
					position: relative;
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
			color: #FFFFFF;
			font-size: 32rpx;
			background: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
		}
	}
	#annualized-chart {
		padding-top: 0.3rem;
		height: 500rpx;
		width: 100%;
	}
}
</style>
