<template>
	<view class="tab">
		<!-- 左右滑动 -->
		<scroll-view scroll-x  class="tab-scroll">
			<!-- 多套一个view，flex才生效 -->
			<view class="tab-scroll-box">
				<view v-for="(item, index) in list" 
				 class="tab-scroll-box_item"
				 :class="{active: listIndex === index}"
				 :key="item._id"
				 @click="checkTab(item, index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icon">
			<uni-icons type="gear" size="26"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tab",
		props: {
			list: {
				type: Array,
				default: [],
			},
			checkIndex: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				listIndex: 0 
			};
		},
		watch: {
			checkIndex(newVal, oldVal){
				this.listIndex = newVal
				console.log(newVal,oldVal,'lin')
			}
		},
		methods: {
			checkTab(item, index) {
				this.listIndex = index
				this.$emit('change', index)
			}
		}
	}
</script>

<style lang="scss">
.tab {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.tab-scroll {
		flex: 1;
		overflow:hidden;
		.tab-scroll-box {
			display: flex;
			flex-wrap: nowrap;
			height: 45px;
			box-sizing: border-box;
			.tab-scroll-box_item {
				flex-shrink: 0;
				height: 40px;
				margin-right: 10px;
				line-height: 40px;
			}
			.active {
				color: $base-color;
			}
		}
	}
	.tab-icon {
		width: 50px;
		margin-left: 5px;
		text-align: center;
		border-left: 1px solid #F0F0F0;
	}
}

</style>
