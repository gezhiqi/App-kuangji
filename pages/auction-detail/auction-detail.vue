<template>
	<view class="detail-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title isBack>详情</common-title>
		<view class="img-box">
			<view
				class="img"
				:style="{ 'background-image': `url(${shopDetail.contentImg})` }"
			></view>
			<view class="desc">{{ shopDetail.name }}</view>
			<view class="price">
				<text class="small">￥</text>
				{{ shopDetail.price | priceBefore }}
				<text class="small">{{ shopDetail.price | priceAfter }}</text>
			</view>
		</view>
		<view class="shop-detail">
			<view class="shop-detail-title">商品介绍</view>
			<view class="shop-content">
				<view class="detail-name">名称：{{ shopDetail.name }}</view>
				<view class="detail-size">尺寸：{{ shopDetail.size }}</view>
				<view class="detail-size">描述：{{ shopDetail.description }}</view>
			</view>
		</view>

		<view class="shop-show">
			<view class="shop-show-title">商品展示</view>
			<view class="shop-show-img-box">
				<view
					class="img"
					:style="{
						'background-image': `url(${shopDetail.contentImg})`,
						width: `${(1000 / height) * width}rpx`
					}"
				></view>
			</view>
		</view>

		<view class="footer">
			<view class="left">
				<view class="desc">收藏</view>
				<view class="collect"></view>
			</view>

			<view class="right">
				<view class="price">
					<text class="small">￥</text>
					{{ shopDetail.price | priceBefore }}
					<text class="small">{{ shopDetail.price | priceAfter }}</text>
				</view>
				<u-button v-if ="shopDetail.openPurchase == '0'" class="u-buy" throttle-time="2000" @click="buy">购买</u-button>
				<u-button v-if ="shopDetail.openPurchase == '1'"  throttle-time="2000" @click="soldOut">已抢拍</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			shopDetail: {
				name:'',
				price:'',
				contentImg:'',
				openPurchase:'',
				description:''
			},
			width: 0,
			height: 0
		};
	},
	filters: {
		priceBefore(value) {
			let index = value && value.indexOf('.');
			return value && value.slice(0, index);
		},
		priceAfter(value) {
			let index = value && value.indexOf('.');
			return value && value.slice(index);
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				// this.statusBarHeight = res.statusBarHeight;
			}
		});
		this.getDetails();
	},

	methods: {
		// this.$Route.query.id
		getDetails() {
			uni.showLoading({
			    title: '加载中'
			});
			this.$api
				.getShopDetail({
					id: this.$Route.query.id || ''
				})
				.then(res => {
					const { code, data } = res.data;
					if (code === 200) {
						this.shopDetail = data;
						let index = data.size.indexOf('*');
						this.width = data.size.slice(0, index - 2);
						this.height = data.size.slice(index + 1, -2);
					}
					else {
						this.$refs.uToast.show({
							title: '数据加载失败',
							type: 'error'
						});
					}
					uni.hideLoading();
				});
		},
		buy() {
			this.$api
				.createdOrder({
					goodsId: this.$Route.query.id || ''
				})
				.then(res => {
					console.log(res);
					const { code, data } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '抢购成功',
							type: 'success'
						});
						this.shopDetail.openPurchase = '1'
					}
					else {
						this.$refs.uToast.show({
							title: '已被他人抢购',
							type: 'error'
						});
					}
				});
		},
		soldOut() {
			this.$refs.uToast.show({
				title: '已抢拍，待付款',
			});
		}
	}
};
</script>

<style lang="scss">
uni-page-body,
body{
	height: 100%;
}
.detail-root {
	padding: 60rpx 30rpx 140rpx;
	background-color: #150e2d;
	min-height: 100%;
	box-sizing: border-box;
	color: #ced3e1;
	.img {
		width: 100%;
		height: 420rpx;
		background: no-repeat center center;
		background-size: contain;
	}
	.img-box {
		padding: 30rpx;
		background-color: #1e1c41;
		border-radius: 20rpx;
		.desc {
			font-size: 32rpx;
		}
		.price {
			margin-top: 20rpx;
			font-size: 40rpx;
			color: #fe3448;
			.small {
				font-size: 26rpx;
			}
		}
	}
	.shop-detail {
		margin-top: 40rpx;
		padding: 30rpx;
		background-color: #1e1c41;
		border-radius: 20rpx;
		.shop-detail-title {
			line-height: 60rpx;
			padding-left: 20rpx;
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
		.shop-content {
			font-size: 26rpx;
			view {
				padding: 20rpx 0;
				line-height: 50rpx;
			}
		}
	}
	.shop-show {
		margin-top: 40rpx;
		padding: 30rpx;
		background-color: #1e1c41;
		border-radius: 20rpx;
		.shop-show-title {
			line-height: 60rpx;
			padding-left: 20rpx;
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
		.shop-show-img-box {
			margin: 20rpx 0 10rpx;
			overflow: auto;
			height: 1000rpx;
			.img {
				height: 100%;
				background: no-repeat center center;
				background-size: cover;
			}
		}
	}
	.footer {
		// border-top: 0.5px solid #ced3e1;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-image: linear-gradient(45deg, #110e2a, #110e2a);
		.left {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.collect {
			margin-left: 20rpx;
			width: 56rpx;
			height: 40rpx;
			background: url(../../static/shoucang.png) no-repeat center center;
			background-size: 100% 100%;
		}
		.right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price {
				margin-right: 20rpx;
				font-size: 40rpx;
				color: #fe3448;
				.small {
					font-size: 26rpx;
				}
			}
			.u-buy {
				margin: 0 !important;
				background-color: #fda328;
				color: #000;
			}
			
		}
	}
}
</style>
