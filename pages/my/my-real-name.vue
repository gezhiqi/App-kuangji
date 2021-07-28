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
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请输入姓名"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="身份证号:">
						<u-input
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请输入身份证号"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="银 行 卡:">
						<u-input
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请输入银行卡号"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
					<u-form-item label-width="auto" label="开 户 行:">
						<u-input
							maxlength="11"
							v-model="form.telephone"
							trim
							:clearable="false"
							placeholder="请输入开户行"
							placeholder-style="color: rgb(95, 88, 116);"
						/>
					</u-form-item>
				</u-form>
				<uni-file-picker
				    :limit ="1"
					:del-icon="showDel"
					v-model="imageValue"
					fileMediatype="image"
					mode="grid"
					@select="select"
				/>
			</view>
			<view class="login_submit">
				<u-button type="primary" @click="loginOn">实名</u-button>
			</view>
			<view @click="open">
				open
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showDel:true,
			imageValue: [],
			form: {
				telephone: '',
				loginPw: '',
				captcha: ''
			},
			action: 'http://101.34.40.13:8088/app/user/save/vx',
			fileList: [],
			header: {
				token: uni.getStorageSync('token')
			},
			'form-data': {
				multipartFile: '',
				vxNum: ''
			}
		};
	},
	methods: {
		open() {
			uni.chooseImage({
			    count: 1, //上传图片的数量，默认是9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
			        const tempFilePaths = res.tempFilePaths;    //拿到选择的图片，是一个数组
					console.log(tempFilePaths)
			    }
			});

		},

		// 获取上传状态
		select(e) {
			console.log('选择文件：', e);
			uni.uploadFile({
			            url: 'http://101.34.40.13:8088/app/user/save/vx', //仅为示例，非真实的接口地址
			            filePath: e.tempFilePaths[0],
			            name: 'file',
			            formData: {
			                vxNum:'13855494204'
			            },
							header: {
								token: uni.getStorageSync('token'),
							},
			            success: (uploadFileRes) => {
			                console.log(uploadFileRes.data);
			            }
			        });
		},
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
			background-color: #f29100;
		}
	}
}
</style>
