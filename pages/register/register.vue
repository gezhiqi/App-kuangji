<template>
	<view class="register">
		<view class="header">
			<view class="left" @click="goBack"></view>
			<view class="center">注册</view>
			<view class="right">登录</view>
		</view>
		<view class="container">
			<view class="container-form">
				<u-form :model="form" ref="uForm">
					<u-form-item label-width="auto" label="手机号码:">
						<u-input
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请输入手机号"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="设置密码:">
						<u-input
							type="password"
							v-model="form.loginPw"
							trim
							:clearable="false"
							placeholder="请设置登录密码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="确认密码:">
						<u-input
							type="password"
							v-model="form.showLoginPw"
							trim
							:clearable="false"
							placeholder="请确认登录密码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="安全密码:">
						<u-input
							type="password"
							v-model="form.payPw"
							trim
							:clearable="false"
							placeholder="请设置安全密码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="确认安密:">
						<u-input
							type="password"
							v-model="form.showPayPw"
							trim
							:clearable="false"
							placeholder="请确认安全密码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="邀 请 码:">
						<u-input
							v-model="form.invitacode"
							trim
							:clearable="false"
							placeholder="请输入邀请码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="短 信 码:">
						<u-input
							v-model="form.smscode"
							trim
							:clearable="false"
							placeholder="请输入验证码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
						<view v-show="count == 0" class="get-code" @click="getSmsCode">
							获取验证码
						</view>
						<view v-show="count > 0" class="get-code num">{{ count }}s</view>
					</u-form-item>
				</u-form>
			</view>
			<view class="protocol">
				注册即为同意
				<text>《用户注册协议》</text>
			</view>
			<view class="register_submit">
				<u-button type="primary" @click="registerBtn">注册</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				telephone: '',
				loginPw: '',
				showLoginPw: '',
				payPw: '',
				showPayPw: '',
				invitacode: '',
				smscode: ''
			},
			timer: null,
			count: ''
		};
	},
	methods: {
		validate() {
			let scope = this;
			return {
				telephone() {
					if (scope.form.telephone === '' || scope.form.telephone === null) {
						scope.$refs.uToast.show({
							title: '手机号不能为空',
							type: 'error'
						});
						return false;
					}
					if (!/^1\d{10}$/.test(scope.form.telephone)) {
						scope.$refs.uToast.show({
							title: '手机格式不正确',
							type: 'error'
						});
						return false;
					} else {
						return true;
					}
				},
				loginPw() {
					if (
						!/^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,18}$/.test(scope.form.loginPw) ||
						scope.form.loginPw === ''
					) {
						scope.$refs.uToast.show({
							title: '密码必须包含字母和数字6-18位',
							type: 'error'
						});
						return false;
					} else {
						return true;
					}
				},
				captcha() {
					if (scope.form.smscode !== '') {
						return true;
					} else {
						scope.$refs.uToast.show({
							title: '验证码不能为空',
							type: 'error'
						});
						return false;
					}
				}
			};
		},
		goBack() {
			uni.navigateBack(1);
		},
		getCode() {
			const TIME_COUNT = 60;
			console.log(123111);
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.showCount = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.showCount = true;
						clearInterval(this.timer);
						this.timer = null;
						this.count = '';
					}
				}, 1000);
			}
		},
		registerBtn() {
			if (!this.validate().telephone()) {
				return false;
			}
			if (!this.validate().loginPw()) {
				return false;
			}
			if (!this.validate().captcha()) {
				return false;
			}
			if (this.form.payPw.length === 0) {
				this.$refs.uToast.show({
					title: '安全密码不能为空',
					type: 'error',
				});
				return false;
			}
			if (this.form.loginPw !== this.form.showLoginPw) {
				this.$refs.uToast.show({
					title: '两次密码不一致',
					type: 'error',
				});
				return false;
			}
			
			if (this.form.payPw !== this.form.showPayPw) {
				this.$refs.uToast.show({
					title: '两次安全密码不一致',
					type: 'error',
				});
				return false;
			}
			this.$api
				.register({
					...this.form
				})
				.then(res => {
					this.$refs.uToast.show({
						title: '注册成功',
						type: 'success',
					});
					setTimeout(() => {
						this.$Router.push({ name: 'index' });
					}, 1000);
					
				})
				.catch(err => {
					// console.log(err);
					// this.$Router.push({ name: 'my' });
				});
		},
		getSmsCode() {
			if (this.form.telephone)
			this.getCode();
			this.$api
				.sendRegister({
					telephone: this.form.telephone
				})
				.then(res => {
					this.$refs.uToast.show({
						title: '短信发送成功轻查收',
						type: 'success',
					});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss">
.register {
	min-height: 100vh;
	padding-top: 60rpx;
	background-color: #150e2d;
	box-sizing: border-box;
	.header {
		padding: 0 30rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		.left {
			width: 36rpx;
			height: 36rpx;
			background: url('../../static/back.png') no-repeat center center;
			background-size: 100% 100%;
		}
		.center {
			color: #ced3e1;
			text-align: center;
			flex: 1;
			font-size: 32rpx;
		}
		.right {
			color: rgb(60, 120, 250);
			font-size: 28rpx;
		}
	}
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
}
</style>
