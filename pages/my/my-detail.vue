<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				我的明细
			</template>
		</common-title>
		<!-- style="{height: `calc(100vh-${statusBarHeight}- 40`}" -->
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
		<view class="list">
			<mescroll-body
				ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:up="upOption"
			>
				<view class="list-item" v-for="(item, index) in dataList" :key="index">
					<view class="left">
						<view class="top">{{ item.info }}</view>
						<view class="bottom">{{ item.createDtme }}</view>
					</view>
					<view class="right">{{ item.number }}</view>
				</view>
			</mescroll-body>
		</view>
		<u-toast ref="uToast" />
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
			statusBarHeight:0,
			list: [
				{
					name: '收入明细',
					noData: false
				},
				{
					name: '支出明细',
					noData: false
				}
			],
			swiperList: [[], [], []],
			incomeList: [],
			dataList: [],
			page: {
				num: 1,
				size: 10
			},
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			}
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	methods: {
		// 初始化
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		// 下滑
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		// 上滑
		upCallback(page) {
			uni.showLoading({
				title: '正在加载'
			});
			console.log(page);
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			this.$api
				.detailList({
					currPage: pageNum,
					pageSize: pageSize,
					status: this.current
				})
				.then(res => {
					console.log('明细列表', res);
					if (res.data.code === 200) {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.data.pages;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
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
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.dataList = [];
			this.page.num = 1;
			this.current = index;
			this.downCallback();
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
		overflow-y: scroll;
		padding-top: 80rpx;
		.list-item {
			padding: 20rpx 10rpx;
			border-bottom: 0.5px solid rgba(204, 204, 204, 0.2);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				.top {
					color: #ffffff;
					font-size: 28rpx;
					padding-bottom: 12rpx;
				}
				.bottom {
					font-size: 22rpx;
					color: rgba(206, 211, 225, 0.4);
				}
			}
			.right {
				font-size: 32rpx;
				color: #f29100;
			}
		}
	}
}
</style>
