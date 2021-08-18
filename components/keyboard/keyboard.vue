<template>
	<view>
		<transition name="opcity">
			<div class="code-box" v-show="show">
				<view class="close" @click="handleClose"></view>
				<view class="title">请输入支付密码</view>
				<view class="title-desc">{{ desc }}</view>
				<div class="verification-code">
					<div :class="{ current: keyboardValue.length === 0 }" class="item">
						{{ keyboardValue.slice(0, 1) }}
					</div>
					<div :class="{ current: keyboardValue.length === 1 }" class="item">
						{{ keyboardValue.slice(1, 2) }}
					</div>
					<div :class="{ current: keyboardValue.length === 2 }" class="item">
						{{ keyboardValue.slice(2, 3) }}
					</div>
					<div :class="{ current: keyboardValue.length === 3 }" class="item">
						{{ keyboardValue.slice(3, 4) }}
					</div>
					<div :class="{ current: keyboardValue.length === 4 }" class="item">
						{{ keyboardValue.slice(4, 5) }}
					</div>
					<div :class="{ current: keyboardValue.length === 5 }" class="item">
						{{ keyboardValue.slice(5, 6) }}
					</div>
				</div>
			</div>
		</transition>

		<u-keyboard
			ref="uKeyboard"
			mode="number"
			v-model="show"
			@change="valChange"
			@backspace="backspace"
			:mask="true"
			:tooltip="false"
			:mask-close-able="false"
			:safe-area-inset-bottom="true"
		></u-keyboard>
	</view>
</template>

<script>
export default {
	name: 'keyboard',
	props: {
		desc: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			show: false,
			keyboardValue: ''
		};
	},
	mounted() {
		console.log(123123, this.$refs.uKeyboard);
	},
	watch: {
		keyboardValue(value) {
			if (value.length === 6) {
				this.complete();
			}
		}
	},
	methods: {
		complete() {
			this.$emit('complete', this.keyboardValue);
			this.keyboardValue = ''
		},
		valChange(val) {
			// 将每次按键的值拼接到value变量中，注意+=写法
			if (this.keyboardValue.length > 5) {
				return false;
			}
			this.keyboardValue += val;
			console.log(this.keyboardValue);
		},
		// 退格键被点击
		backspace() {
			// 删除value的最后一个字符
			if (this.keyboardValue.length)
				this.keyboardValue = this.keyboardValue.substr(0, this.keyboardValue.length - 1);
			console.log(this.keyboardValue);
		},
		handleClose() {
			this.keyboardValue = ''
			this.show = false;
		}
	}
};
</script>

<style lang="scss">
@keyframes highlight {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

.u-drawer {
	overflow: visible;
}
.code-box {
	position: fixed;
	left: 50%;
	top: 220rpx;
	padding: 60rpx 0 100rpx;
	transform: translateX(-50%);
	background-color: #ffffff;
	color: #333333;
	z-index: 99999;
	border-radius: 10rpx;
	.close {
		position: absolute;
		left: 20rpx;
		top: 20rpx;
		width: 66rpx;
		height: 66rpx;
		background: url(../../static/img/close2.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.title {
		font-weight: 700;
		font-size: 32rpx;
		text-align: center;
	}
	.title-desc {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		font-weight: 700;
		font-size: 28rpx;
		text-align: center;
	}
	.verification-code {
		padding: 0 35rpx;
		display: flex;
		justify-content: center;
		.item {
			text-align: center;
			background-color: #ffffff;
			border-radius: 8rpx;
			line-height: 90rpx;
			height: 90rpx;
			width: 90rpx;
			font-size: 38rpx;
			color: #333333;
			border: 1px solid #eeeeee;
			box-sizing: border-box;
			border-right: none;
			&:last-child {
				border-right: 1px solid #eeeeee;
			}
			&.current {
				position: relative;
				&::after {
					content: '';
					height: 50rpx;
					width: 4rpx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					background-color: #333333;
					animation: highlight 1s infinite steps(1, start);
				}
			}
		}
	}
}
.opcity-enter-active {
	animation: opcity-dialog-fade-in 0.3s linear;
}
.opcity-leave-active {
	animation: opcity-dialog-fade-out 0.3s linear;
}

@keyframes opcity-dialog-fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes opcity-dialog-fade-out {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
