<template>
	<view class="newperson-detail-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				{{ title }}
			</template>
		</common-title>
		<view class="content">{{ content }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
			statusBarHeight: 0
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getDetail();
	},
	methods: {
		getDetail() {
			let id = this.$Route.query.id;
			this.$api.getCourseDetail(id).then(res => {
				let { data, code, msg } = res.data;
				if (code === 200) {
					this.content = data.content;
					this.title = data.title;
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'warning'
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
.newperson-detail-root {
	padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.content {
		text-indent: 2em;
		font-size: 28rpx;
		text-align: justify;
		line-height: 50rpx;
	}
}
</style>
