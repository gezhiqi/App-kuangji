<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				出售订单
			</template>
		</common-title>
		<!-- style="{height: `calc(100vh-${statusBarHeight}- 40`}" -->
		<u-tabs-swiper
			:style="{ marginTop: statusBarHeight + 'px' }"
			ref="tabs"
			:list="list"
			:current="current"
			@change="tabsChange"
			:is-scroll="false"
			inactive-color="#ced3e1"
			active-color="#f29100"
			bg-color="#1e1c41"
		></u-tabs-swiper>
		<!-- 		<swiper :current="current" class="swiper-box">
				<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index"> -->
		<view class="list">
			<mescroll-body
				ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:up="upOption"
			>
				<view class="list-item" v-for="(item, index) in dataList" :key="item.id">
					<view class="item-top">
						<view class="item-title">
							<view>买方信息：{{ item.buyTelephone }}</view>
						</view>
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
						<text class="time" v-show="[0, 1].includes(current)">
							剩余时间：{{ item.endTime | countDownFun(nowDate) }}
						</text>
						<view @click="sellMoney(item.id)">{{ item.status | filterStatus }}</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<u-toast ref="uToast" />
		<u-modal
			v-model="showPayment"
			:show-cancel-button="true"
			@cancel="showPayment = false"
			@confirm="handlePayment"
		>
			<view class="slot-content">
				<view class="">请确认已成功收款，并确认继续。</view>
				<image @click="showQrCode" :src="imageObj.orderUrl" mode="aspectFit"></image>
				<view class="certificate">付款码</view>
			</view>
		</u-modal>
		<u-popup class="qr-pop" v-model="QrPop" mode="center">
			<image :src="imageObj.orderUrl" mode="aspectFit"></image>
		</u-popup>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			current: 0,
			swiperCurrent: 0,
			showModal: false,
			QrPop: false,
			list: [
				{
					name: '待收款',
					count: 0,
					noData: false
				},
				{
					name: '确认收款',
					count: 0,
					noData: false
				},
				{
					name: '已完成',
					count: 0,
					noData: false
				},
				{
					name: '未完成',
					count: 0,
					noData: false
				}
			],
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			page: {
				num: 1,
				size: 10
			},
			dataList: [],
			showPayment: false,
			currentId: '',
			imageObj: {
				orderUrl: ''
			},
			statusBarHeight: 0,
			nowDate:null
		};
	},
	filters: {
		filterStatus(value) {
			let obj = ['处理中', '待收款', '待确认', '已完成', '订单超时', '异常取消', '已处理'];
			return obj[value];
		},
		countDownFun(endT, nowT) {
			const end = Date.parse(new Date(endT));
			// 当前时间戳
			const now = Date.parse(new Date(nowT));
			// 相差的毫秒数
			const msec = end - now;
			if (msec < 0) {
				return '订单超时';
			}
			// 计算时分秒数
			let hr = parseInt((msec / 1000 / 60 / 60) % 24);
			let min = parseInt((msec / 1000 / 60) % 60);
			let sec = parseInt((msec / 1000) % 60);
			// 个位数前补零
			hr = hr > 9 ? hr : '0' + hr;
			min = min > 9 ? min : '0' + min;
			sec = sec > 9 ? sec : '0' + sec;
			return `${min}分${sec}秒`;
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.updateDate();
		// this.pledgeDetailList();
	},
	// computed:{
	// 	...mapState(['userInfo'])
	// },
	methods: {
		updateDate() {
			let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
			let  timer = setInterval(() => {
				_this.nowDate = new Date();
			}, 1000);
			this.$once('hook:beforeDestory', () => {
				clearInterval(timer);
				timer = null;
			});
		},
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.dataList = [];
			this.page.num = 1;
			this.current = index;
			this.downCallback();
		},
		showQrCode() {
			this.QrPop = true;
		},
		sellMoney(id) {
			if (this.current == 0) {
				this.$refs.uToast.show({
					title: '请等待买家付款'
				});
			}
			if (this.current == 1) {
				this.currentId = id;
				this.imageObj = this.dataList.find(item => {
					return item.id === id;
				});

				this.showPayment = true;
			}
		},
		handlePayment() {
			this.$api
				.sellerConfirm(this.currentId)
				.then(res => {
					const { data, code, msg } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						});
						this.downCallback();
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			uni.showLoading({
				title: '正在加载'
			});
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			this.$api
				.sellList({
					currPage: pageNum,
					pageSize: pageSize,
					status: this.current + 1
				})
				.then(res => {
					console.log('订单列表', res);
					if (res.data.code === 200) {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.records || [];
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.data.pages;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						let hasNext = curPageData.length < 10 ? false : true;
						let index = this.current;
						this.list[0].count = res.data.transactionCount;
						this.list[1].count = res.data.paymentCount;
						this.list[2].count = res.data.completeCount;
						//设置列表数据
						if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
						this.dataList = this.dataList.concat(curPageData); //追加新数据

						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
						setTimeout(() => {
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 20);
						uni.hideLoading();
					} else {
						uni.hideLoading();
					}
				})
				.catch(err => {
					uni.hideLoading();
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
	padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.u-tabs {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
	}

	.list {
		padding-top: 80rpx;
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
				position: relative;
				view {
					padding: 0 15rpx;
					height: 50rpx;
					line-height: 48rpx;
					text-align: center;
					font-size: 24rpx;
					border-radius: 30rpx;
					background: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
				}
				.time {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					font-size: 26rpx;
					line-height: 24rpx;
				}
			}
		}
	}
	.u-model {
		.slot-content {
			padding: 48rpx;
			font-size: 30rpx;
			color: #606266;
			text-align: center;
			// display: flex;
			image {
				width: 400rpx;
				height: 400rpx;
			}
			.code-desc {
				padding-top: 20rpx;
				color: #303133;
				font-size: 28rpx;
			}
		}
	}
}
</style>
