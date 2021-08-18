<template>
	<view class="new-person-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				新手教程
			</template>
		</common-title>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id" @click="goDetail(item.id)">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			list: []
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getlist();
	},
	methods: {
		getlist() {
			this.$api.newProsonCourse().then(res => {
				const { code, data } = res.data;
				if (code === 200) {
					this.list = data;
				}
			});
		},
		goDetail(id) {
			uni.navigateTo({
				url: `/pages/my/my-newperson-detail?id=${id}`
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
.new-person-root {
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
				// margin-top: 7rpx;
				right: 7rpx;
			}
		}
	}
}
</style>
