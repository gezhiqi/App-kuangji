<template>
	<view class="login">
		<view class="login-form">
			<view class="title">
				<view class="title-f">欢迎来到Draw the world</view>
				<view class="title-t">请登录</view>
			</view>
			<u-form :model="form" ref="uForm">
				<u-form-item prop="telephone">
					<image class="icon" src="../../static/zhanghu.png"></image>
					<u-input
						maxlength="11"
						v-model="form.telephone"
						trim
						:clearable="false"
						placeholder="请输入手机号"
						placeholder-style="color: rgb(95, 88, 116);"
					/>
				</u-form-item>
				<u-form-item prop="loginPw">
					<image class="icon" src="../../static/mima.png"></image>
					<u-input
						type="password"
						v-model="form.loginPw"
						trim
						:clearable="false"
						placeholder="请输入密码"
						placeholder-style="color: rgb(95, 88, 116);"
					/>
				</u-form-item>
				<u-form-item prop="captcha">
					<image class="icon" src="../../static/mima.png"></image>
					<u-input
						maxlength="4"
						v-model="form.captcha"
						trim
						:clearable="false"
						placeholder="请输入验证码"
						placeholder-style="color: rgb(95, 88, 116);"
					/>
					<u-image
						width="170rpx"
						height="70rpx"
						ref="vfCode"
						:src="imgVfCode"
						class="img-code"
						@click="refreshCode"
					></u-image>
				</u-form-item>
			</u-form>
			<view class="forget" @click="goForget">忘记密码？</view>
		</view>
		<view class="login_submit"><u-button type="primary" @click="loginOn">登录</u-button></view>
		<view class="registered-download">
			<view class="registered" @click="toRegister">没有账号？去注册</view>
			<view class="download">下载App</view>
		</view>
		<view><u-toast ref="uToast" /></view>
	</view>
</template>

<script>
import { BASE_URL } from '../../common/request/http.js';
export default {
	data() {
		return {
			form: {
				telephone: '',
				loginPw: '',
				captcha: ''
			},
			// rules: {
			// 	telephone: [
			// 		{
			// 			required: true,
			// 			message: '请输入姓名',
			// 			// 可以单个或者同时写两个触发验证方式
			// 			trigger: ['change', 'blur']
			// 		}
			// 	],
			// 	loginPw: [
			// 		// 正则判断为字母或数字
			// 		{
			// 			pattern: /^[0-9a-zA-Z]*$/g,
			// 			// 正则检验前先将值转为字符串
			// 			transform(value) {
			// 				return String(value);
			// 			},
			// 			message: '只能包含字母或数字',
			// 			trigger: ['change', 'blur']
			// 		},
			// 		// 6-8个字符之间的判断
			// 		{
			// 			min: 6,
			// 			max: 18,
			// 			message: '长度在6-18个字符之间',
			// 			trigger: ['change', 'blur']
			// 		}
			// 	]
			// },
			imgVfCode: `${BASE_URL}/app/image/captchaImg`
		};
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕

	mounted() {
		this.refreshCode();
	},
onBackPress(options) {
        console.log('from:' + options.from)
		return true
    },
	// onReady() {
	// 	console.log('onload123');
	// 	this.$refs.uForm.setRules(this.rules);
	// },
	methods: {
		refreshCode() {
			if (this.$refs.vfCode) {
				this.imgVfCode = `${this.$refs.vfCode.src.replace(
					/\?uuid=\w+/,
					''
				)}?uuid=${new Date().getTime()}`;
			}
		},
		loginOn() {
			if (!this.validate().telephone()) {
				return false;
			}
			if (!this.validate().loginPw()) {
				return false;
			}
			if (!this.validate().captcha()) {
				return false;
			}
			uni.showLoading({
				title: '正在登录'
			});
			let index = this.$refs.vfCode.src.indexOf('uuid');
			let uuid = this.$refs.vfCode.src.slice(index + 5);
			this.$api
				.login({
					...this.form,
					uuid
				})
				.then(res => {
					if (res.data.code == 200) {
						uni.setStorageSync('token', res.data.accessToken);
						this.$refs.uToast.show({
							title: '登录成功',
							type: 'success'
						});
						
						setTimeout(() => {
							uni.hideLoading();
							uni.switchTab({
								url: '/pages/index/index'
							});
						}, 1000);
						
						uni.setStorageSync('telephone', this.form.telephone);
					} else {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error'
						});
						this.refreshCode();
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
		},
		toRegister() {
			this.$Router.push({ name: 'register' });
		},
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
					if (scope.form.captcha !== '') {
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
		goForget() {
			uni.navigateTo({ url: '/pages/forget/forget' });
		}
	}
};
</script>

<style lang="scss">
.login {
	padding: 90rpx 32rpx 32rpx;
	min-height: 100vh;
	background-color: #150e2d;
	color: #333;
	box-sizing: border-box;
	.login-form {
		padding: 0 22rpx;
		.title {
			color: rgb(206, 211, 225);
			.title-f {
				font-size: 52rpx;
			}
			.title-t {
				margin-top: 16rpx;
				font-size: 44rpx;
			}
		}
		.u-form {
			padding-top: 26rpx;
			.u-form-item {
				margin-top: 30rpx;
				padding: 20rpx 0;
				border-bottom: #202643 solid 1px;
				.icon {
					width: 40rpx;
					height: 40rpx;
				}
				.u-input {
					margin-left: 16rpx;
					font-size: 32rpx;
					line-height: 1.4em;
					height: 1.4em;
					min-height: 1.4em;
					overflow: hidden;
					::v-deep .u-input__input {
						min-height: auto !important;
						font-size: 32rpx;
						color: rgb(206, 211, 225);
					}
				}
				.uni-input-placeholder {
					font-size: 32rpx;
				}
				.img-code {
					overflow: hidden !important;
					border-radius: 10rpx !important;
				}
			}
		}
		.forget {
			margin-top: 30rpx;
			font-size: 28rpx;
			color: rgb(95, 88, 116);
		}
	}
	.login_submit {
		margin-top: 90rpx;
	}
	.registered-download {
		display: flex;
		justify-content: space-between;
		color: rgb(60, 120, 250);
		font-size: 28rpx;
		margin-top: 20rpx;
	}
}
</style>
