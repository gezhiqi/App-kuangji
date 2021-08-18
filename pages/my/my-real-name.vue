<template>
	<view class="real-root">
		<common-title :isBack="true">
			<template v-slot:default>
				实名认证
			</template>
		</common-title>
		<view class="container">
			<view class="container-form">
				<u-form v-if="userInfo.idCard === null" :model="form" ref="uForm">
					<u-form-item label-width="auto" label="姓 名:">
						<u-input
							maxlength="20"
							v-model="form.userName"
							trim
							:clearable="false"
							placeholder="请输入姓名"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="身份证号:">
						<u-input
							maxlength="18"
							v-model="form.idCard"
							trim
							:clearable="false"
							placeholder="请输入身份证号"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
				</u-form>
				<u-form v-else>
					<u-form-item label-width="auto" label="姓 名:">
						<u-input
						:disabled="true"
							maxlength="20"
							:value="userInfo.userName"
							trim
							:clearable="false"
							placeholder="请输入姓名"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="身份证号:">
						<u-input
						:disabled="true"
							maxlength="18"
							:value="userInfo.idCard"
							trim
							:clearable="false"
							placeholder="请输入身份证号"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
				</u-form>
				<!-- <view class="certificate">上传身份证人像面：</view>
				<uni-file-picker
					v-if="userInfo.cardUrl === null"
					:limit="1"
					fileMediatype="image"
					mode="grid"
					@select="select"
					@delete="deleteImg"
				/>
				<image v-else :src="userInfo.cardUrl" mode="aspectFit"></image> -->
			</view>
			<view v-if="userInfo.idCard === null" class="login_submit">
				<u-button type="primary" @click="realName">实 名</u-button>
			</view>
			<view v-else class="login_submit">
				<u-button>{{ userInfo.realStatus === '1' ? '已 实 名' : '审核中' }}</u-button>
			</view>
			<view class="sys-desc">
				亲爱的用户，为保证用户的正真实性，我们将调用第三方公司认证系统进行实名认证，整个认证过程制作用户真实性匹配对比，不做其他用途。每人每天1次认证机会，若当日认证超过1次，24小时方可再次认证。
			</view>
		</view>
		<view><u-toast ref="uToast" /></view>
	</view>
</template>

<script>
import { BASE_URL } from '../../common/request/http.js';
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			showDel: true,
			imageValue: [],
			form: {
				userName: '',
				idCard: ''
				// bankCard: '',
				// bankName: ''
			},
			QrPop: true,
			sfzPath: ''
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	created() {
		this.getUserInfo();
	},
	methods: {
		...mapActions(['getUserInfo']),
		open() {
			uni.chooseImage({
				count: 1, //上传图片的数量，默认是9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
					console.log(tempFilePaths);
				}
			});
		},
		validate() {
			let scope = this;
			return {
				name() {
					if (scope.form.userName === '' || scope.form.userName === null) {
						scope.$refs.uToast.show({
							title: '姓名不能为空',
							type: 'error'
						});
						return false;
					}
					if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(scope.form.userName)) {
						scope.$refs.uToast.show({
							title: '请输入正确的姓名',
							type: 'error'
						});
						return false;
					} else {
						return true;
					}
				},
				idCard() {
					if (
						!/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/.test(scope.form.idCard) ||
						scope.form.idCard === ''
					) {
						scope.$refs.uToast.show({
							title: '请输入正确的身份证格式',
							type: 'error'
						});
						return false;
					} else {
						return true;
					}
				},
				bankCard() {
					if (
						!/^([1-9]{1})(\d{15,18})$/.test(scope.form.bankCard) ||
						scope.form.bankCard === ''
					) {
						scope.$refs.uToast.show({
							title: '请输入正确的银行卡号',
							type: 'error'
						});
						return false;
					} else {
						return true;
					}
				},
				bankName() {
					if (scope.form.bankName !== '') {
						return true;
					} else {
						scope.$refs.uToast.show({
							title: '开户行不能为空',
							type: 'error'
						});
						return false;
					}
				}
			};
		},

		realName() {
			if (!this.validate().name()) {
				return false;
			}
			if (!this.validate().idCard()) {
				return false;
			}
			// if (this.payPath === '') {
			// 	return this.$refs.uToast.show({
			// 		title: '请上传付款凭证'
			// 	});
			// }
			// uni.uploadFile({
			// 	url: `${BASE_URL}/app/user/real`,
			// 	filePath: this.sfzPath,
			// 	name: 'file',
			// 	formData: this.form,
			// 	header: {
			// 		token: uni.getStorageSync('token')
			// 	},
			// 	success: res => {
			// 		let result = JSON.parse(res.data);
			// 		if (result.code === 200) {
			// 			this.$refs.uToast.show({
			// 				title: '实名成功',
			// 				type: 'success'
			// 			});
			// 			this.getUserInfo();
			// 			uni.navigateBack(1);
			// 		} else {
			// 			this.$refs.uToast.show({
			// 				title: res.data.msg,
			// 				type: 'error'
			// 			});
			// 		}
			// 	}
			// });
			this.$api
				.realName(this.form.userName,this.form.idCard)
				.then(res => {
					const { data, code, msg } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '实名成功',
							type: 'success'
						});
						this.getUserInfo();
						uni.navigateBack(1);
					} else {
						this.$refs.uToast.show({
							title: msg,
							type: 'error'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},

		// 获取上传状态
		select(e) {
			console.log('选择文件：', e);
			this.sfzPath = e.tempFilePaths[0];
		},
		deleteImg() {
			this.sfzPath = '';
		}
	}
};
</script>

<style lang="scss">
.real-root {
	min-height: 100vh;
	padding-top: 60rpx;
	background-color: #150e2d;
	box-sizing: border-box;
	.container {
		padding: 32rpx;
		.container-form {
			padding: 38rpx 22rpx 22rpx;
			.u-form-item {
				line-height: 0;
				margin-top: 30rpx;
				padding: 18rpx 0;
				color: #ced3e1;
				border-bottom: #202643 solid 1px;
				font-size: 28rpx;
				.u-input {
					margin-left: 16rpx;
					font-size: 28rpx;
					// line-height: 1.4em;
					// height: 1.4em;
					// min-height: 1.4em;
					overflow: hidden;
					::v-deep .u-input__input {
						min-height: auto !important;
						font-size: 30rpx;
						color: rgb(206, 211, 225);
					}
				}
				.uni-input-placeholder {
					font-size: 30rpx;
				}
				.get-code {
					font-size: 26rpx;
					color: #ced3e1;
				}
			}
			.certificate {
				margin-top: 30rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				color: #ced3e1;
			}
			image {
				width: 200rpx;
				height: 200rpx;
			}
			.row {
				margin-top: 30rpx;
				color: #ced3e1;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: #202643 solid 1px;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
				.btn {
					height: 50rpx;
					line-height: 50rpx;
					color: #ffffff;
					padding: 0 30rpx;
					font-size: 24rpx;
					text-align: center;
					border-radius: 25rpx;
					background-color: #f29100;
				}
			}
		}
		.protocol {
			padding: 0 22rpx;
			color: rgb(75, 90, 113);
			font-size: 24rpx;
			text {
				color: rgb(60, 120, 250);
			}
		}
		.sys-desc {
			margin-top: 30rpx;
			color: #606266;
			font-size: 26rpx;
			text-align: justify;
		}
		.register_submit {
			margin-top: 90rpx;
		}
	}
	.login_submit {
		margin-top: 60rpx;
		.u-btn--primary {
			// background-color: #f29100;
		}
	}
	.qr-pop {
		.qr-code {
			// display: flex;
			::v-deep .file-picker__box {
				margin: 0 auto;
			}
			.code-desc {
				padding-top: 20rpx;
				text-align: center;
				font-size: 24rpx;
			}
		}
		::v-deep .u-mode-center-box {
			width: 600rpx !important;
			padding: 20rpx 30rpx 40rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
		}
		image {
			width: 600rpx;
		}
	}
}
</style>
