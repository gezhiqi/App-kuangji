<template>
	<view class="real-root">
		<common-title :isBack="true">
			<template v-slot:default>
				实名认证
			</template>
		</common-title>
		<view class="container">
			<view class="container-form">
				<u-form :model="form" ref="uForm">
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
					<u-form-item label-width="auto" label="银 行 卡:">
						<u-input
							maxlength="19"
							v-model="form.bankCard"
							trim
							:clearable="false"
							placeholder="请输入银行卡号"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="开 户 行:">
						<u-input
							maxlength="20"
							v-model="form.bankName"
							trim
							:clearable="false"
							placeholder="请输入开户行"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
				</u-form>
				<!-- 	<view class="row">
					<view>微 信：</view>
					<view class="btn" @click="updateCode">修改</view>
				</view>
				<view class="row">
					<view>支 付 宝：</view>
					<view class="btn" @click="updateCode">修改</view>
				</view> -->
			</view>
			<view class="login_submit">
				<u-button type="primary" @click="realName">实 名</u-button>
			</view>
			<view @click="open">open</view>
		</view>

		<!-- <u-popup class="qr-pop" v-model="QrPop" mode="center">
			<u-form-item label-width="auto" label="微 信:">
				<u-input
					maxlength="11"
					v-model="form.telephone"
					trim
					:clearable="false"
					placeholder="请输入微信账号"
					placeholder-style="color: rgb(95, 88, 116);"
				/>
			</u-form-item>
			<view class="qr-code">
				<uni-file-picker
					:limit="1"
					:del-icon="showDel"
					v-model="imageValue"
					fileMediatype="image"
					mode="grid"
					@select="select"
				/>
				<view class="code-desc">请上传微信收款码</view>
			</view>
		</u-popup> -->
		<view><u-toast ref="uToast" /></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showDel: true,
			imageValue: [],
			form: {
				userName: '',
				idCard: '',
				bankCard: '',
				bankName: ''
			},
			QrPop: true
		};
	},
	methods: {
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
			if (!this.validate().bankCard()) {
				return false;
			}
			if (!this.validate().bankName()) {
				return false;
			}
			this.$api.realName(this.form).then(res => {
				if (res.data.code == 200) {
					this.$refs.uToast.show({
						title: '实名成功',
						type: 'success'
					});
					uni.navigateBack(1);
				}else {
					this.$refs.uToast.show({
						title: res.data.msg,
						type: 'error'
					});
				}
			});
		}

		// 获取上传状态
		// select(e) {
		// 	console.log('选择文件：', e);
		// 	uni.uploadFile({
		// 		url: 'http://101.34.40.13:8088/app/user/save/vx', //仅为示例，非真实的接口地址
		// 		filePath: e.tempFilePaths[0],
		// 		name: 'file',
		// 		formData: {
		// 			vxNum: '13855494204'
		// 		},
		// 		header: {
		// 			token: uni.getStorageSync('token')
		// 		},
		// 		success: uploadFileRes => {
		// 			console.log(uploadFileRes.data);
		// 		}
		// 	});
		// }
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
