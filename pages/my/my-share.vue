<template>
	<view  class="my-share-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				邀请好友得奖励
			</template>
		</common-title>
		<view :style="{ paddingTop: statusBarHeight + 'px' }" class="content" >
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
				<view class="desc">扫描下载注册</view>
				<view class="btn-box">
					<view class="btn1" @click="copyUrl">复制邀请地址</view>
					<view class="btn2" @click="savePicture">保存邀请海报</view>
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
				<view class="btn-box">
					<view class="btn1" @click="copyUrl">复制邀请地址</view>
					<view class="btn2" @click="savePicture">保存邀请海报</view>
				</view>
			</view>
		</view>
		<!-- <savefile v-if="isShowPhoto" :url="qrUrl" @hide="hidePhoto"></savefile> -->
	</view>
</template>

<script>
import qrCode from '../../common/weapp-qrcode.js';
import { mapActions, mapState } from 'vuex';
import permision from '@/js_sdk/wa-permission/permission.js';
import html2canvas from 'html2canvas'
// import { Os, Browser } from '../../common/SL.js';
export default {
	data() {
		return {
			statusBarHeight: 0,
			isShowPhoto: true,
			qrUrl: 'https://image-1252618452.cos.ap-hongkong.myqcloud.com/lunbo2.png',
			imageUrl: require('../../static/header-bg.png'),
			base64: ''
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
			this.toImg()
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapActions(['getUserInfo']),
		getQRCode() {
			new qrCode('downQrCode', {
				text: `https://www.czldny.com/#/pages/register/register?invitecode=${
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
				data: `https://www.czldny.com/#/pages/register/register?invitecode=${
					this.userInfo.inviteCode
				}`
			});
		},
		toImg() {
			let dom = uni.createSelectorQuery().select("#poster")
			console.log(dom.clientWidth,dom.clientHeight)
			html2canvas(dom, {
				width:dom.clientWidth,
				height:dom.clientHeight,
				scrollY: 0,
				scrollX: 0,
				useCORS: true
			}).then(canvas => {
				this.base64 = canvas.toDataURL('image/jpeg',0.1)
			})
		},
		savePicture() {
			this.saveImgFile()
		},
		saveImgFile() {
		    let base64 = this.base64;
		    const bitmap = new plus.nativeObj.Bitmap("test");
		    bitmap.loadBase64Data(base64, function() {
		        const url = "_doc/" + new Date().getTime() + ".png";  // url为时间戳命名方式
		        console.log('saveHeadImgFile', url)
		        bitmap.save(url, {
		            overwrite: true,  // 是否覆盖
		            // quality: 'quality'  // 图片清晰度
		        }, (i) => {
		            uni.saveImageToPhotosAlbum({
		                filePath: url,
		                success: function() {
		                    uni.showToast({
		                        title: '图片保存成功',
		                        icon: 'none'
		                    })
		                    bitmap.clear()
		                }
		            });
		        }, (e) => {
		            uni.showToast({
		                title: '图片保存失败',
		                icon: 'none'
		            })
		            bitmap.clear()
		        });
		    }, (e) => {
		        uni.showToast({
		            title: '图片保存失败',
		            icon: 'none'
		        })
		        bitmap.clear()
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
		top:0;
		min-height: 100vh;
		background: url(../../static/invite-bg.jpg) no-repeat top center;
		background-size: cover;
		box-sizing: border-box;
		transform: translateX(-200%);
	}
}
</style>
