<template>
	<view class="transacte-rule-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				交易说明
			</template>
		</common-title>
		<view class="content">
			<view>1、玩家只可发布5个购买订单，只可同时出售1单，交易完成后方可继续匹配下一订单。</view>
			<view>2、玩家需在20分钟之内付款或者收款确认，否则订单冻结，根据交易流程冻结对应玩家账户。</view>
			<view>3、如玩家因订单超时被冻结账户，可找上级或其他玩家解冻账户，需扣除上级或其他玩家5个SUC。</view>
			<view>4、交易手续费为10%，由卖方提供。例：出售20个SUC，则需要扣除22个SUC。</view>
			<view>5、交易严禁虚假，恶意扰乱市场，否则永久冻结资金账户。</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight:0,
	
		};
	},
	created() {
		console.log(123)
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
uni-page-body,
body {
	height: 100%;
}
.transacte-rule-root {
	padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.content {
		text-indent: 2em;
		font-size: 28rpx;
		text-align: justify;
		line-height: 40rpx;
		view {
			margin-top: 20rpx;
			color: #ffffff;
		}
	}
}
</style>
