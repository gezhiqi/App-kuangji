<template>
	<view class="update-root" v-if="show">
		<view>
			<u-modal title="发现新版本" v-model="show" content="" confirm-text="确认升级" @confirm="toUpdate"></u-modal>
		</view>
	</view>
</template>

<script>
export default {
	name: 'update',
	data() {
		return {
			show: false
		};
	},
	methods: {
		toUpdate() {
			plus.runtime.openURL('https://image-1252618452.cos.ap-hongkong.myqcloud.com/SUC.apk', function(res) {
				console.log(res);
			});
		}
	}
};
</script>

<style lang="scss">
.update-root {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.7);
}
</style>
