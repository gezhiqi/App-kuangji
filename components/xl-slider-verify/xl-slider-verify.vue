<template>
	<view class="content" style="overflow: hidden;">
		<view class="slider-container" :style="{backgroundColor:sliderBlockBg,touchAction: 'none'}">
			<view class="" style="height: 100%;font-size: 26rpx;color: #000;text-align: center;line-height: 90rpx;">
				{{value==100?successText:initText}}
			</view>
			<view class="front" :style="{width: value+'%',backgroundColor:forntBg}">
				
			</view>
			<view class="slider-block" :style="{left:!value?'0':'calc('+value+'% - '+sliderBlockWidth+'rpx)',width:sliderBlockWidth+'rpx'}">
				>>
			</view>
			<slider :value="value" @change="sliderChange" :disabled="disabled" activeColor="transparent" @changing="changing" block-color="transparent" :block-size="35" backgroundColor="transparent" style="position: absolute;top:6rpx;left: 0;z-index: 5;width: 88%;" />
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			initText:{
				type:String,
				default:'右滑验证' //未滑动的验证文案
			},
			successText:{
				type:String,
				default:'验证成功'//验证成功文案
			},
			sliderBlockBg:{//
				type:String,
				default:'#dae2d0'//滑块颜色
			},
			forntBg:{
				type:String,
				default:'green'//滑块滑动后的颜色
			},
			sliderBlockWidth:{
				type:Number,//单位rpx 最大80
				default:80
			},
			reset:{
				type:Boolean,//成功后重置
				default:true
			}
		},
		data() {
			return {
				value:0,
				disabled:false
			}
		},
		onLoad() {
			
		},
		methods: {
			changing(e){
				this.value=e.detail.value
			},
			sliderChange(e){
				if(e.detail.value!=100){
					this.value=e.detail.value
					this.$nextTick(()=>{
						this.value=0
					})
				}
				if(e.detail.value==100){
					this.value=100
					this.$emit('success') //验证成功触发组件通知
					if(!this.reset){
						this.disabled=true
						return
					}
					setTimeout(()=>{
						this.value=0
					},1500)
				}
			}
		}
	}
</script>

<style lang="scss">
	.slider-container {
		position: relative;
		border: 2rpx solid #C0C0C0;
		height: 90rpx;
		border-radius: 4rpx;
		overflow: hidden;
		width: 100%;
		/deep/.uni-slider-thumb{
			box-shadow: none;
		}
		.slider-block{
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			color: #787878;
			border-right: 1px solid #cccccc;
			line-height: 80rpx;
			background-color: #fff;
			text-align: center;
			max-width: 80rpx;
		}
		.front{
			height:100%;
			position:absolute;
			top:0;left:0;
			opacity:0.8;
		}
	}
</style>
