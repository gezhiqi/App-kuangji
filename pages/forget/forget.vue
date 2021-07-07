<template>
	<view class="forget-root">
		<view class="header">
			<view class="left" @click="goBack"></view>
			<view class="center">修改/忘记密码</view>
			<view class="right" @click="goLogin">登录</view>
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
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请设置新的登录密码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="确认密码:">
						<u-input
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请确认新的登录密码"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="短 信 码:">
						<u-input
							maxlength="11"
							v-model="form.telephone"
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
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				telephone: '',
				loginPw: '',
				captcha: ''
			},
			count:0
		};
	},
	methods: {
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
		getSmsCode() {
			this.getCode();
			this.$api
				.sendRegister({
					telephone: this.form.telephone
				})
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		goLogin() {
			uni.redirectTo({url: '/pages/login/login'})
		}
	}
};
</script>

<style lang="scss">
.forget-root {
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
