<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				我的团队
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
			<view class="show-box">
				<view class="row top">
					<view>团队人数:{{total}}</view>
					<view>有效人数:{{realTotal}}</view>
				</view>
				<view v-show="current === 0" class="row">
					<view>一级邀请人数:{{ ontTotalCount }}</view>
					<view>一级有效人数:{{ list[0].count }}</view>
				</view>
				<view v-show="current === 1" class="row">
					<view>二级邀请人数:{{ twoTotalCount }}</view>
					<view>二级有效人数:{{ list[1].count }}</view>
				</view>
				<view v-show="current === 2" class="row">
					<view>三级邀请人数:{{ threeTotalCount }}</view>
					<view>三级有效人数:{{ list[2].count }}</view>
				</view>
			</view>
			<swiper :current="current" @change="swiperChange" class="swiper-box">
				<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
					<view v-for="(v, i) in item" :key="v.id">
						<view class="pledge-item">
							<view class="left">{{ v.telephone }}</view>
							<view
								class="right"
								:class="{ red: v.real_status === '0' ? 'red' : '' }"
							>
								{{ v.real_status === '0' ? '未实名' : v.real_status === '1' ? '已实名' : '已实名(有效)' }}
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
					name: '一级下级',
					count: 0,
					noData: false
				},
				{
					name: '二级下级',
					count: 0,
					noData: false
				},
				{
					name: '三级下级',
					count: 0,
					noData: false
				}
			],
			swiperList: [[], [], []],
			ontTotalCount: 0,
			twoTotalCount: 0,
			threeTotalCount: 0,
			statusBarHeight: 0,
			realTotal: 0,
			total: 0
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getList();
	},
	methods: {
		getList() {
			if (this.swiperList[this.current].length > 0 || this.list[this.current].noData) {
				return false;
			}
			uni.showLoading({
				title: '正在加载'
			});
			this.$api.teamList(this.current + 1).then(res => {
				let { data, code, msg, team } = res.data;
				if (code === 200) {
					uni.hideLoading();
					this.swiperList[this.current] = data;
					if (this.swiperList[this.current].length == 0) {
						this.list[this.current].noData = true;
					}
					this.list[0].count = team.ontRealCount;
					this.ontTotalCount = team.ontTotalCount;
					this.list[1].count = team.twoRealCount;
					this.twoTotalCount = team.twoTotalCount;
					this.list[2].count = team.threeRealCount;
					this.threeTotalCount = team.threeTotalCount;
					this.realTotal = team.realTotal
					this.total = team.total
					this.$forceUpdate();
				} else {
					uni.hideLoading();
				}
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.current = index;
			this.getList();
		},
		swiperChange(e) {
			this.current = e.detail.current;
			this.getList();
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
		.show-box {
			padding-left: 20rpx;
			margin-top: 16rpx;
			width: 100%;
			height: 180rpx;
			border-radius: 10rpx;
			background: url(../../static/header-bg.png) no-repeat center center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 30rpx;
			.row {
				display: flex;
				justify-content: space-between;
				view {
					width: 240rpx;
					// flex: 1;
				}
				&.top {
					margin-bottom: 20rpx;
				}
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
				.pledge-item {
					padding: 40rpx 10rpx;
					border-bottom: 0.5px solid rgba(204, 204, 204, 0.2);
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left {
						color: #ffffff;
						font-size: 30rpx;
					}
					.right {
						font-size: 32rpx;
						color: #f29100;
						font-weight: 700;
						&.red {
							color: #fa3534;
						}
					}
				}
			}
		}
	}
}
</style>
