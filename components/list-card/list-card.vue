<template>
	<view class="list">
		<view v-for="item in list" :key="item.id">
			<!-- 基础卡片 -->
			<view class="list-base common" v-if="item.mode === 'base'">
				<view class="list-top">
					<view class="item-image">
						<image  :src="item.cover" mode="scaleToFill"></image>
					</view>
					<view class="text">
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="list-bottom">
					<view class="bottom-web">{{item.classify}}</view>
					<view class="bottom-view">{{item.browse_count}}浏览</view>
				</view>
			</view>
			<!-- 多图模式 -->
			<view class="list-more common" v-if="item.mode === 'column'">
				<view class="list-top">
					<view class="text">
						<text>{{item.title}}</text> 
					</view>
			
					<view class="item-image" >
						<image :src="item" mode="scaleToFill" v-for="(item, index) in item.cover"  v-if="index < 3" :key="index"></image>
					</view>
				</view>
				<view class="list-bottom">
					<view class="bottom-web">{{item.classify}}</view>
					<view class="bottom-view">{{item.browse_count}}浏览</view>
				</view>
			</view>
			<!-- 大图模式 -->
			<view class="list-big common" v-if="item.mode === 'image'">
				<view class="list-top">
					
					<view class="item-image">
						<image class="item-image" :src="item.cover" mode="scaleToFill"></image>
					</view>
					<view class="text">
						<text>{{item.title}}</text> 
					</view>
					
					
				</view>
				<view class="list-bottom">
					<view class="bottom-web">{{item.classify}}</view>
					<view class="bottom-view">{{item.browse_count}}浏览</view>
				</view>
			</view>
			
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"card-list",
		props: {
			mode: {
				type: String,
				default: 'base'
			},
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.common {
	//height: 150px;;
	border: 1px solid #F8F8F8;
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
	
}
.list-base {
	.list-top {
		display: flex;
		flex-wrap: nowrap;
		.item-image image {
			width: 70px;
			height: 70px;
		}
		.text {	
		}
		
	}
	.list-bottom {
		display: flex;
		justify-content: space-between;
		.bottom-web { 
			color: $base-color;
			margin-left: 75px;
			border: 1px $base-color solid;
		    border-radius: 10px;
		}
		.bottom-view {
			color: #8F8F94;
		}
	}
}
.list-more {
	.list-top {
		.text {
			//width: 100%;
		}
		.item-image {
			display: flex;
			image {
				width: 100%;
				height: 75px;
				margin-right: 10px;
			}
		}
	}
	.list-bottom {
		display: flex;
		justify-content: space-between;
		.bottom-web {
			color: $base-color;
			border: 1px $base-color solid;
		    border-radius: 10px;
		}
		.bottom-view {
			color: #8F8F94;
		}
	}
	
}
.list-big {
	.list-top {
		.item-image {
			height: 100px;
			width: 100%;
		}
	}
	.list-bottom {
		display: flex;
		justify-content: space-between;
		.bottom-web { 
			color: $base-color;
			border: 1px $base-color solid;
		    border-radius: 10px;
		}
		.bottom-view {
			color: #8F8F94;
		}
	}
}

</style>
