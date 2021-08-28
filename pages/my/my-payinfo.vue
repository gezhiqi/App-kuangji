<template>
	<view class="real-root">
		<common-title :isBack="true">
			<template v-slot:default>
				收款信息
			</template>
		</common-title>
		<view class="container">
			<view class="container-form">
				<view class="row">
					<view>微 信：{{ userInfo.wxCard }}</view>
					<view class="btn" v-show="userInfo.wxCard === null" @click="updateWxCode">设置</view>
				</view>
				<view class="row">
					<view>支 付 宝：{{ userInfo.zfbCard }}</view>
					<view class="btn"v-show="userInfo.zfbCard === null" @click="updateZfbCode">设置</view>
				</view>
				<view class="row">
					<view>银 行 卡：{{ userInfo.bankCard }}</view>
					<view class="btn"v-show="userInfo.bankCard === null" @click="updateYhkCode">设置</view>
				</view>
			</view>
		</view>

		<u-popup class="qr-pop" v-model="wxQrPop" mode="center">
			<u-form-item label-width="auto" label="微信账号:">
				<u-input
					maxlength="11"
					v-model="wxNum"
					trim
					:clearable="false"
					placeholder="请输入微信账号"
					placeholder-style="color: rgb(95, 88, 116);"
				/>
			</u-form-item>
			<view class="qr-code">
				<view class="code-desc">请上传微信收款码：</view>
				<uni-file-picker
					:limit="1"
					:del-icon="showDel"
					fileMediatype="image"
					mode="grid"
					@select="selectWx"
					@delete="deleteWxImg"
				/>
			</view>
			<view class="login_submit">
				<u-button type="primary" @click="showWx">确 认 修 改</u-button>
			</view>
		</u-popup>
		<u-popup class="qr-pop" v-model="zfbQrPop" mode="center">
			<u-form-item label-width="auto" label="支付宝账号:">
				<u-input
					maxlength="11"
					v-model="zfbNum"
					trim
					:clearable="false"
					placeholder="请输入支付宝账号"
					placeholder-style="color: rgb(95, 88, 116);"
				/>
			</u-form-item>
			<view class="qr-code">
				<view class="code-desc">请上传支付宝收款码：</view>
				<uni-file-picker
					:limit="1"
					:del-icon="showDel"
					fileMediatype="image"
					mode="grid"
					@select="selectZfb"
					@delete="deleteZfbImg"
				/>
			</view>
			<view class="login_submit">
				<u-button type="primary" @click="showZfb">确 认 修 改</u-button>
			</view>
		</u-popup>
		<u-popup class="qr-pop" v-model="yhkQrPop" mode="center">
			<u-form-item label-width="auto" label="银行卡号:">
				<u-input
					maxlength="19"
					v-model="form.bankCard"
					trim
					:clearable="false"
					placeholder="请输入银行卡卡号"
					placeholder-style="color: rgb(95, 88, 116);"
				/>
			</u-form-item>
			<u-form-item label-width="auto" label="银行卡开户行:">
				<u-input
					maxlength="20"
					v-model="form.bankName"
					trim
					:clearable="false"
					placeholder="请输入银行卡开户行"
					placeholder-style="color: rgb(95, 88, 116);"
				/>
			</u-form-item>
			<view class="login_submit">
				<u-button type="primary" @click="showYhk">确 认 修 改</u-button>
			</view>
		</u-popup>
		<view><u-toast ref="uToast" /></view>
	</view>
</template>

<script>
import { BASE_URL } from '../../common/request/http.js';
import { mapActions, mapState } from 'vuex';
export default {
	data() {
		return {
			showDel: true,
			wxNum: '',
			wxPath: '',
			zfbNum: '',
			zfbPath: '',
			form: {
				bankCard: '',
				bankName: ''
			},
			wxQrPop: false,
			zfbQrPop: false,
			yhkQrPop: false
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapActions(['getUserInfo']),
		// 获取上传状态
		selectWx(e) {
			console.log('选择文件：', e);
			this.wxPath = e.tempFilePaths[0];
		},
		selectZfb(e) {
			console.log('选择文件：', e);
			this.zfbPath = e.tempFilePaths[0];
		},
		updateWxCode() {
			if (this.userInfo.wxCard !== null) {
				return this.$refs.uToast.show({
					title: '无法修改',
				});
			}
			this.wxQrPop = true;
		},
		updateZfbCode() {
			if (this.userInfo.zfbCard !== null) {
				return this.$refs.uToast.show({
					title: '无法修改',
				});
			}
			this.zfbQrPop = true;
		},
		updateYhkCode() {
			if (this.userInfo.bankCard !== null) {
				return this.$refs.uToast.show({
					title: '无法修改',
				});
			}
			this.yhkQrPop = true;
		},
		deleteWxImg() {
			this.wxPath = '';
		},
		deleteZfbImg() {
			this.zfbPath = '';
		},
		validate() {
			let scope = this;
			return {
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
		showWx() {
			if (this.wxNum === '') {
				return this.$refs.uToast.show({
					title: '微信账号不能为空'
				});
			}
			if (this.wxPath === '') {
				return this.$refs.uToast.show({
					title: '付款码不能为空'
				});
			}
			uni.uploadFile({
				url: `${BASE_URL}/app/user/save/vx`, //仅为示例，非真实的接口地址
				filePath: this.wxPath,
				name: 'file',
				formData: {
					vxNum: this.wxNum
				},
				header: {
					token: uni.getStorageSync('token')
				},
				success: res => {
					let result = JSON.parse(res.data);
					if (result.code === 200) {
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success'
						});
						this.getUserInfo()
						this.wxQrPop = false;
					} else {
						this.$refs.uToast.show({
							title: result.msg,
							type: 'error'
						});
					}
				}
			});
		},
		showZfb() {
			if (this.zfbNum === '') {
				return this.$refs.uToast.show({
					title: '支付宝账号不能为空'
				});
			}
			if (this.zfbPath === '') {
				return this.$refs.uToast.show({
					title: '付款码不能为空'
				});
			}
			uni.uploadFile({
				url: `${BASE_URL}/app/user/save/zfb`, //仅为示例，非真实的接口地址
				filePath: this.zfbPath,
				name: 'file',
				formData: {
					zfbNum: this.zfbNum
				},
				header: {
					token: uni.getStorageSync('token')
				},
				success: res => {
					let result = JSON.parse(res.data);
					if (result.code === 200) {
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success'
						});
						this.getUserInfo()
						this.zfbQrPop = false;
					} else {
						this.$refs.uToast.show({
							title: result.msg,
							type: 'error'
						});
					}
				}
			});
		},
		showYhk() {
			if (!this.validate().bankCard()) {
				return false;
			}
			if (!this.validate().bankName()) {
				return false;
			}
			this.$api
				.saveBank({
					bankCard: this.form.bankCard,
					bankName: this.form.bankName
				})
				.then(res => {
					const { data, code, msg } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						});
						this.getUserInfo()
						this.yhkQrPop = false
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error'
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
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
			.row {
				margin-top: 50rpx;
				color: #ced3e1;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: #202643 solid 1px;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn {
					height: 50rpx;
					line-height: 50rpx;
					color: #ffffff;
					padding: 0 30rpx;
					font-size: 24rpx;
					text-align: center;
					border-radius: 25rpx;
					background-color: #2979ff;
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

	.qr-pop {
		.login_submit {
			margin-top: 60rpx;
			// .u-btn--primary {
			// 	background-color: #f29100;
			// }
		}
		.qr-code {
			// display: flex;
			::v-deep .file-picker__box {
				margin: 20rpx auto;
			}
			.code-desc {
				padding-top: 20rpx;
				color: #303133;
				font-size: 28rpx;
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
