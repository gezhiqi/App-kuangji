<template>
	<view class="pledge-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title :isBack="true">
			<template v-slot:default>
				购买订单
			</template>
		</common-title>
		<!-- style="{height: `calc(100vh-${statusBarHeight}- 40`}" -->
		<u-tabs-swiper
			:style="{ marginTop: statusBarHeight + 'px' }"
			ref="tabs"
			:list="list"
			:current="current"
			@change="tabsChange"
			:is-scroll="false"
			inactive-color="#ced3e1"
			active-color="#f29100"
			bg-color="#1e1c41"
		></u-tabs-swiper>
		<!-- 		<swiper :current="current" class="swiper-box">
				<swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index"> -->
		<view class="list">
			<mescroll-body
				ref="mescrollRef"
				@init="mescrollInit"
				@down="downCallback"
				@up="upCallback"
				:up="upOption"
			>
				<view class="list-item" v-for="(item, index) in dataList" :key="item.id">
					<view class="item-top">
						<view class="item-title">订单单号：{{ item.orderNum }}</view>
					</view>
					<view class="item-bottom">
						<view class="left">
							<view class="tips">数量：{{ item.num }}</view>
							<view class="price">价格￥{{ item.price }}</view>
						</view>
						<view class="right">
							<view class="r-top">单价</view>
							<view class="r-bot">{{ item.unitPrice }}</view>
						</view>
					</view>
					<view class="item-footer">
						<view
							v-show="[1, 2, 3, 4].includes(current)"
							class="confirm"
							@click="showPay(item.id)"
						>
							{{ item.status | filterStatus }}
						</view>
						<view class="look" v-show="current == 0" @click="cancelOrder(item.id)">
							取消
						</view>
						<view class="look" @click="lookSeller(item.id)">订单信息</view>
					</view>
				</view>
			</mescroll-body>
		</view>
		<u-toast ref="uToast" />
		<u-popup class="info-pop" v-model="showPopup" mode="center">
			<view class="row">订单号：{{ sellerInfo.orderNum }}</view>
			<view class="row">订单数量：{{ sellerInfo.num }}</view>
			<view class="row">订单金额：{{ sellerInfo.price }}</view>
			<view class="row">卖家名称：{{ sellerInfo.sellName }}</view>
			<view class="row">卖家电话：{{ sellerInfo.sellTelephone }}</view>
			<view class="row">卖家银行卡：{{ sellerInfo.bankCard }}</view>
			<view class="row">银行卡开户行：{{ sellerInfo.bankName }}</view>
			<view class="qr-code" v-show="current === 1">
				<view class="left">
					<image
						@click="showQrCode(sellerInfo.wxUrl)"
						:src="sellerInfo.wxUrl"
						mode="aspectFit"
					></image>
					<text>微信付款码</text>
				</view>
				<view class="right">
					<image
						@click="showQrCode(sellerInfo.zfbUrl)"
						:src="sellerInfo.zfbUrl"
						mode="aspectFit"
					></image>
					<text>支付宝付款码</text>
				</view>
			</view>
		</u-popup>
		<u-popup class="qr-pop" v-model="QrPop" mode="center">
			<image :src="currentQrCode" mode="aspectFit"></image>
		</u-popup>
		<u-modal
			v-model="showPayPop"
			:show-cancel-button="true"
			@cancel="showPayPop = false"
			@confirm="handleshowPay"
		>
			<view class="slot-content">
				<view class="">恶意扰乱市场，存在封号风险！请确认已转账成功，确认继续。</view>
				<uni-file-picker
					:limit="1"
					fileMediatype="image"
					mode="grid"
					@select="select"
					@delete="deleteImg"
				/>
				<view class="certificate">
					上传付款截图
				</view>
			</view>
		</u-modal>
		<u-modal
			v-model="cancelPop"
			:show-cancel-button="true"
			content="确认取消购买请求？"
			@cancel="cancelPop = false"
			@confirm="handleCancelPop"
		></u-modal>
	</view>
</template>

<script>
	import {BASE_URL} from '../../common/request/http.js';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			current: 0,
			swiperCurrent: 0,
			showModal: false,
			showPopup: false,
			cancelPop: false,
			list: [
				{
					name: '挂单中',
					count: 0,
					noData: false
				},
				{
					name: '付款中',
					count: 0,
					noData: false
				},
				{
					name: '已付款',
					count: 0,
					noData: false
				},
				{
					name: '已完成',
					count: 0,
					noData: false
				},
				{
					name: '未完成',
					count: 0,
					noData: false
				}
			],
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			page: {
				num: 1,
				size: 10
			},
			dataList: [],
			sellerInfo: {},
			showPayPop: false,
			QrPop: false,
			currentQrCode: '',
			payPath: '',
		};
	},
	filters: {
		filterStatus(value) {
			let obj = ['待与卖家匹配', '确认付款', '待卖家确认', '已完成', '未完成'];
			return obj[value];
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		// this.pledgeDetailList();
	},
	mounted() {},
	methods: {
		// 初始化
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.dataList = [];
			this.page.num = 1;
			this.current = index;
			this.downCallback();
		},
		// 打开订单信息弹窗
		lookSeller(id) {
			this.showPopup = true;
			this.getSellerInfo(id);
		},
		// 取消订单提示
		cancelOrder(id) {
			this.cancelPop = true;
			this.currentId = id;
		},
		// 展示付款码弹窗
		showQrCode(url) {
			this.QrPop = true;
			this.currentQrCode = url;
		},
		select(e) {
			console.log('选择文件：', e);
			this.payPath = e.tempFilePaths[0];
		},
		deleteImg() {
			this.payPath = ''
		},
		// 取消订单确认
		handleCancelPop() {
			this.$api
				.buyerCancel(this.currentId)
				.then(res => {
					const { data, code, msg } = res.data;
					if (code === 200) {
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						});
						this.downCallback();
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
		},
		// 确认付款提示
		showPay(id) {
			if (this.current == 1) {
				this.showPayPop = true;
				this.currentId = id;
			}
			if (this.current == 2) {
				this.$refs.uToast.show({
					title: '请等待卖家确认收款',
				});
			}
		},
		// 确认付款
		handleshowPay() {
			if (this.payPath === '') {
				return this.$refs.uToast.show({
					title: '请上传付款凭证',
				});
			}
			
			uni.uploadFile({
				url: `${BASE_URL}/app/order/payment`, 
				filePath: this.payPath,
				name: 'file',
				formData: {
					id: this.currentId
				},
				header: {
					token: uni.getStorageSync('token')
				},
				success: res => {
					let result = JSON.parse(res.data)
					if (result.code === 200) {
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success'
						});
						this.downCallback();
					} else {
						this.$refs.uToast.show({
							title: result.msg,
							type: 'error'
						});
					}
				}
			});
			
			
			// this.$api
			// 	.buyerPays(this.currentId)
			// 	.then(res => {
			// 		const { data, code, msg } = res.data;
			// 		if (code === 200) {
			// 			this.$refs.uToast.show({
			// 				title: '操作成功',
			// 				type: 'success'
			// 			});
			// 			this.downCallback();
			// 		} else {
			// 			this.$refs.uToast.show({
			// 				title: res.data.msg,
			// 				type: 'error'
			// 			});
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});
		},
		// 获取订单信息
		getSellerInfo(id) {
			this.$api
				.checkingOrder(id)
				.then(res => {
					const { data, code, msg } = res.data;
					if (code === 200) {
						this.sellerInfo = data;
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
		},
		// 下滑
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		// 上滑
		upCallback(page) {
			uni.showLoading({
				title: '正在加载'
			});
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			this.$api
				.buyList({
					currPage: pageNum,
					pageSize: pageSize,
					status: this.current
				})
				.then(res => {
					console.log('订单列表', res);
					if (res.data.code === 200) {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.data.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.data.pages;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = res.data.data.total;
						// 接口返回的是否有下一页 (true/false)
						let hasNext = curPageData.length < 10 ? false : true;
						let index = this.current;
						this.list[1].count = res.data.transactionCount;
						this.list[2].count = res.data.paymentCount;
						this.list[3].count = res.data.completeCount;
						//设置列表数据
						if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
						this.dataList = this.dataList.concat(curPageData); //追加新数据

						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
						setTimeout(() => {
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 20);
						uni.hideLoading();
					} else {
						uni.hideLoading();
					}
				})
				.catch(err => {
					uni.hideLoading();
				});
		}
	}
};
</script>

<style lang="scss">
uni-page-body,
body {
	height: 100%;
}
.pledge-root {
	padding: 60rpx 32rpx 40rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	.u-tabs {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
	}

	.list {
		padding-top: 80rpx;
		.list-item {
			padding: 10rpx;
			border-bottom: 0.5px solid rgba(204, 204, 204, 0.2);
			.item-title {
				font-size: 28rpx;
				line-height: 58rpx;
				color: #8d57fc;
				word-break: break-all;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			.item-bottom {
				display: flex;
				justify-content: space-between;
				.left {
					font-size: 24rpx;
					line-height: 46rpx;
					.price {
						line-height: 60rpx;
					}
				}
				.right {
					font-size: 24rpx;
					line-height: 46rpx;
					color: #c067f6;
					.r-bot {
						font-size: 42rpx;
						line-height: 60rpx;
					}
				}
			}
			.item-footer {
				display: flex;
				flex-direction: row-reverse;
				padding: 10rpx 0;
				view {
					padding: 0 20rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					font-size: 28rpx;
					border-radius: 30rpx;
					background: linear-gradient(270deg, #8d57fc 0%, #c067f6 100%);
				}
				.look {
					margin-right: 20rpx;
				}
			}
		}
	}
	.info-pop {
		color: #333333;

		::v-deep .u-mode-center-box {
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
		}
		.row {
			line-height: 60rpx;
			font-size: 30rpx;
		}
		.qr-code {
			width: 600rpx;
			display: flex;
			justify-content: space-around;
			.left,
			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				text {
					text-align: center;
					font-size: 26rpx;
				}
				image {
					width: 200rpx;
					height: 300rpx;
				}
			}
		}
	}
	.qr-pop {
		::v-deep .u-mode-center-box {
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
		}
		image {
			width: 600rpx;
		}
	}
	.u-model {
		.slot-content {
			padding: 48rpx;
			font-size: 30rpx;
			color: #606266;
			text-align: center;
				// display: flex;
				::v-deep .file-picker__box {
					margin: 40rpx auto 20rpx;
				}
				.code-desc {
					padding-top: 20rpx;
					color: #303133;
					font-size: 28rpx;
				}
		}
	}
}
</style>
