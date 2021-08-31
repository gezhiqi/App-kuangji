<template>
	<view class="my-share-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="root-title">
			<view class="back" @click="goBack"></view>
			<view>邀请好友得奖励</view>
		</view>
		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="content">
			<image src="../../static/logo.png" mode="aspectFit"></image>
			<view class="desc1">Space Universe Coin</view>
			<!-- <view class="desc2">您的好友诚邀您一起开启区块链星际旅程</view> -->
			<view class="desc2">邀请好友和您一起开启区块链星际旅程</view>
			<view class="invite-box">
				<view class="role1"></view>
				<view class="role2"></view>
				<view class="role3"></view>
				<view class="role4"></view>
				<view class="title">我的邀请码</view>
				<view class="invite-code">{{ userInfo.inviteCode }}</view>
			</view>
			<view class="footer">
				<view class="qrcode">
					<canvas style="width: 200rpx; height: 200rpx;" canvas-id="downQrCode"></canvas>
				</view>
				<view class="desc">扫描二维码下载注册</view>
				<view class="btn-box">
					<view class="btn1" @click="copyUrl">复制邀请地址</view>
					<!-- <view class="btn2" @click="toImg">保存邀请海报</view> -->
				</view>
			</view>
		</view>

		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="content" id="poster">
			<image src="../../static/logo.png" mode="aspectFit"></image>
			<view class="desc1">Space Universe Coin</view>
			<!-- <view class="desc2">您的好友诚邀您一起开启区块链星际旅程</view> -->
			<view class="desc2">你的好友诚邀您一起开启区块链星际旅程</view>
			<view class="invite-box">
				<view class="role1"></view>
				<view class="role2"></view>
				<view class="role3"></view>
				<view class="role4"></view>
				<view class="title">好友邀请码</view>
				<view class="invite-code">{{ userInfo.inviteCode }}</view>
			</view>
			<view class="footer">
				<view class="qrcode">
					<canvas style="width: 200rpx; height: 200rpx;" canvas-id="downQrCode"></canvas>
				</view>
				<view class="desc">扫描下载注册</view>
				<!-- <view class="btn-box">
					<view class="btn1" @click="copyUrl">复制邀请地址</view>
					<view class="btn2" @click="savePicture">保存邀请海报</view>
				</view> -->
			</view>
		</view>
		<u-toast ref="uToast" />
		<canvas canvas-id="myCanvas" id="sss"></canvas>
		<!-- <savefile v-if="isShowPhoto" :url="qrUrl" @hide="hidePhoto"></savefile> -->
	</view>
	
</template>

<script>
import qrCode from '../../common/weapp-qrcode.js';
import { mapActions, mapState } from 'vuex';
import permision from '@/js_sdk/wa-permission/permission.js';
import html2canvas from 'html2canvas';
// import { Os, Browser } from '../../common/SL.js';
export default {
	data() {
		return {
			statusBarHeight: 0,
			isShowPhoto: true,
			imageUrl: require('../../static/header-bg.png'),
			base64: '',
			imgFile: ''
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
	},
	async mounted() {
		this.getQRCode();
		await this.getUserInfo();
		// this.toImg();
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapActions(['getUserInfo']),
		goBack() {
			uni.navigateBack(1);
		},
		getQRCode() {
			new qrCode('downQrCode', {
				text: `https://web.czldny.com/#/?invitecode=${
					this.userInfo.inviteCode
				}`,
				width: 100,
				height: 100,
				colorDark: '#000000',
				colorLight: '#FFFFFF'
			});
		},
		copyUrl() {
			uni.setClipboardData({
				data: `https://web.czldny.com/#/?invitecode=${
					this.userInfo.inviteCode
				}`
			});
		},
		toImg() {
			let dom = uni.createSelectorQuery().select('#poster');
			// let dom = document.querySelector('#poster')
			console.log(200, 200);
			html2canvas(dom, {
				width: getSystemInfoSync,
				height: 200,
				scrollY: 0,
				scrollX: 0,
				useCORS: true
			}).then(canvas => {
				this.base64 = canvas.toDataURL('image/jpeg', 0.1);
				console.log(this.base64);
				this.$api
					.sharePost({
						base64: this.base64
					})
					.then(res => {
						const { data, code, msg } = res.data;
						if (code === 200) {
							console.log(data);
							this.imgFile = data;
						}
					})
					.catch(err => {
						console.log('base64err', err);
					});
			}).catch(err => {
				console.log(err)
			})
		},
		savePicture() {
			console.log(this.imgFile);
			uni.downloadFile({
				url: this.imgFile, //仅为示例，并非真实的资源
				success: res => {
					if (res.statusCode === 200) {
						console.log('下载成功');
					}
					let that = this;
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: () => {
							this.$refs.uToast.show({
								title: '保存成功',
								type: 'success'
							});
						}
					});
				}
			});
		},

		bcFn() {
			uni.saveImageToPhotosAlbum({
				//保存图片
				filePath: this.base64,
				success: res => {
					uni.showToast({
						title: '保存成功'
					});
				}
			});
		},
		hidePhoto() {
			this.isShowPhoto = false;
			uni.showToast({
				title: '图片已隐藏',
				icon: 'none'
			});
		}
	}
};
</script>
<style lang="scss">
.my-share-root {
	min-height: 100vh;
	background: url(../../static/invite-bg.jpg) no-repeat top center;
	background-size: cover;
	box-sizing: border-box;
	.root-title {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #ced3e1;
		font-size: 32rpx;
		z-index: 99;
		// background-image: linear-gradient(45deg, #110e2a, #110e2a);
		.back {
			position: absolute;
			left: 30rpx;
			bottom: 26rpx;
			width: 36rpx;
			height: 36rpx;
			background: url('../../static/back.png') no-repeat center center;
			background-size: 100% 100%;
		}

	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #f8f8f8;
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.desc1 {
			margin-top: 10rpx;
			font-size: 36rpx;
		}
		.desc2 {
			margin-top: 100rpx;
		}
		.invite-box {
			margin-top: 60rpx;
			width: 660rpx;
			height: 400rpx;
			border: 4rpx solid rgba(3, 242, 252, 0.5);
			background-color: rgba(3, 242, 252, 0.05);
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			.role1,
			.role2,
			.role3,
			.role4 {
				width: 50rpx;
				height: 50rpx;
				border: 4rpx solid rgba(3, 242, 252, 1);
			}
			.role1 {
				position: absolute;
				left: -4rpx;
				top: -4rpx;
				border-right: none;
				border-bottom: none;
			}
			.role2 {
				position: absolute;
				right: -4rpx;
				top: -4rpx;
				border-left: none;
				border-bottom: none;
			}
			.role3 {
				position: absolute;
				left: -4rpx;
				bottom: -4rpx;
				border-right: none;
				border-top: none;
			}
			.role4 {
				position: absolute;
				right: -4rpx;
				bottom: -4rpx;
				border-left: none;
				border-top: none;
			}
			.title {
				position: absolute;
				left: 50%;
				top: 0;
				transform: translate(-50%, -50%);
				font-size: 36rpx;
				color: rgba(3, 242, 252, 1);
				box-shadow: 0 0 2rpx 1rpx #03f2fc;
				height: 70rpx;
				line-height: 62rpx;
				text-align: center;
				width: 220rpx;
				border: 4rpx solid rgba(3, 242, 252, 0.5);
				background-color: #000;
				border-radius: 40rpx;
			}
			.invite-code {
				padding: 20rpx 40rpx;
				border: 4rpx solid rgba(3, 242, 252, 0.5);
				font-size: 64rpx;
				font-weight: 700;
			}
		}
		.qrcode {
			margin-top: 20rpx;
			width: 220rpx;
			height: 220rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.footer {
			position: absolute;
			bottom: 40rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28rpx;
			.btn-box {
				margin-top: 20rpx;
				display: flex;
				.btn1 {
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
					font-size: 30rpx;
					background-image: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
				}
				.btn2 {
					margin-left: 30rpx;
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
					font-size: 30rpx;
					background-image: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
				}
			}
		}
	}
	#poster {
		position: fixed;
		left: 0;
		top: 0;
		min-height: 100vh;
		// background: url(../../static/invite-bg.jpg) no-repeat top center;
		// background-size: cover;
		// box-sizing: border-box;
		transform: translateX(-200%);
		background-color: #000;
	}
}
</style>
