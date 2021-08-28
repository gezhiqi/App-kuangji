<template>
	<view class="notice-list-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				公告
			</template>
		</common-title>
		<view class="list">
			<view class="item" v-for="item in noticeList" :key="item.id" @click="goDetail(item.id)">
				<text class="title">{{ item.title }}</text>
				<text class="time">{{ item.createDtme }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			noticeList: []
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getNoticeList();
	},
	methods: {
		getNoticeList() {
			this.$api.getNoticeList().then(res => {
				let { data, code } = res.data;
				if (code === 200) {
					this.noticeList = data;
				}
			});
		},
		goDetail(id) {
			uni.navigateTo({
				url: `/pages/index/notice-detail?id=${id}`
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
.notice-list-root {
	padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.list {
		.item {
			line-height: 100rpx;
			font-size: 30rpx;
			border-bottom: 1px solid rgba(206, 211, 225, 0.2);
			position: relative;
			display: flex;
			justify-content: space-between;
			.time {
				padding-right: 40rpx;
				font-size:18rpx;
			}
			&::after {
				content: ' ';
				display: inline-block;
				height: 18rpx;
				width: 18rpx;
				border-width: 1px 1px 0 0;
				border-color: rgba(206, 211, 225, 0.7);
				border-style: solid;
				-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
				transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
				position: absolute;
				top: 50%;
				margin-top: -8rpx;
				right: 7rpx;
			}
		}
	}
}
</style>
