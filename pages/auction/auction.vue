<template>
	<view class="auction-root" :style="{ paddingTop: statusBarHeight + 40 + 'px' }">
		<common-title>拍卖</common-title>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:up="upOption"
		>
			<view class="list">
				<view
					class="list-item"
					v-for="item in dataList"
					:key="item.id"
					@click="toDetails(item)"
				>
					<view
						class="img"
						:style="{ 'background-image': `url(${item.contentImg})` }"
					></view>
					<view class="tips">{{ item.remarks }}</view>
					<view class="price">￥{{ item.price }}</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import { BASE_URL } from '../../common/request/http.js';
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';

export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			statusBarHeight: 0,
			// 列表数据
			dataList: [],
			morningCode: -1,
			afternoonCode: -1,
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			}
		};
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.statusBarHeight = res.statusBarHeight;
			}
		});
		// this.getSession();
	},
	methods: {
		getSession() {
			this.$api
				.getSession()
				.then(res => {
					console.log('获取场地', res);
					this.morningCode = res.data.data[0].playCode;
					this.afternoonCode = res.data.data[1].playCode;
					console.log('morningCode', this.morningCode);
				})
				.catch(err => {
					console.log(err);
				});
		},

		downCallback() {
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		 upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条

			console.log(pageNum, pageSize, this.morningCode);
			// 获取专场code
			this.$api
				.getSession()
				.then(res => {
					console.log('获取场地', res);
					this.morningCode = res.data.data[0].playCode;
					this.afternoonCode = res.data.data[1].playCode;
					console.log('morningCode', this.morningCode);
					// 获取商品列表
					this.$api
						.getShopList({
							currPage: pageNum,
							pageSize: pageSize,
							playCode: this.morningCode
						})
						.then(res => {
							console.log('商品列表', res);

							if (res.data.code === 200) {
								// this.dataList = ;
								console.log(this.dataList);
								// 接口返回的当前页数据列表 (数组)
								let curPageData = res.data.data.records;
								// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
								let curPageLen = curPageData.length;
								// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
								let totalPage = res.data.data.total / 10;
								// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
								let totalSize = res.data.data.total;
								// 接口返回的是否有下一页 (true/false)
								let hasNext = curPageData.length < 10 ? false : true;

								//设置列表数据
								if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
								this.dataList = this.dataList.concat(curPageData); //追加新数据

								// 请求成功,隐藏加载状态
								//方法一(推荐): 后台接口有返回列表的总页数 totalPage
								this.mescroll.endByPage(curPageLen, totalPage);

								setTimeout(() => {
									this.mescroll.endSuccess(curPageLen);
								}, 20);
							}
						})
						.catch(err => {
						});
				})
				.catch(err => {
					console.log(err);
				});
		},
		toDetails(item) {
			if (item.openPurchase == '1') {
				this.$refs.uToast.show({
					title: '已售完',
				});
				return false;
			}
			this.$Router.push({path:'/pages/auction-detail/auction-detail',query: { id: item.id }})
			// this.$Router.push({ name: 'auction-detail'})
			// uni.navigateTo({
			// 	url:`/pages/auction-detail/auction-detail?id=${id}`
			// })
		}
	}
};
</script>

<style lang="scss">
uni-page-body,
body{
	height: 100%;
}
.auction-root {
	padding: 60rpx 30rpx 60rpx;
	background-color: #150e2d;
	min-height: 100%;
	color: #ced3e1;
	box-sizing: border-box;
	/* #1e1c41 */
	.list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.list-item {
			width: 334rpx;
			height: 334rpx;
			margin-bottom: 22rpx;
			background-color: #1e1c41;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 10rpx;
			.img {
				position: relative;
				width: 300rpx;
				height: 200rpx;
				background: no-repeat center center;
				background-size: contain;
				// .tips {
				// 	position: absolute;
				// 	left: 0;
				// 	bottom: 0;
				// 	height: 40rpx;
				// 	width: 300rpx;
				// 	background-color: rgba(206, 211, 225, 0.8);
				// }
			}
			.tips {
				margin: 10rpx 0 20rpx;
				width: 100%;
				padding-left: 20rpx;
				font-size: 28rpx;
			}
			.price {
				width: 100%;
				font-size: 32rpx;
				color: #fe3448;
			}
		}
	}
}
</style>
