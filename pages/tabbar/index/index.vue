<template>
	<view class="home">
		<!-- 导航栏 -->
		<navbar></navbar>
		<!-- tab选项卡 -->
	    <tab class="home-tab" :list="tabList" :checkIndex="checkIndex" @change="change"></tab>
	    <!-- 卡片列表 -->
		<view  class="home-list" >
			<swiper class="list-swiper" @change="changeSwiper" :current="current">
				<swiper-item class="swiper-item" 
				 style="{height: swiperHeight+ 'px';}"
				 v-for="(item, index) in tabList.length"
				>
					<list-scroll></list-scroll>
				</swiper-item>
			</swiper>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],  // tab数据
				swiperHeight: '',
				checkIndex: 0,   // tab索引
				current: 0,     // swiper-item当前页
			}
		},
		// 页面使用onLoad，组件使用created
		onLoad() {
			this.getLabel()   // tab数据
			//swiper高度自适应
			this.getElementHeight('.swiper-item')
			
		},
		methods: {
			getLabel() {
				this.$api.get_label().then((res) => {
					console.log(res,'res')
					this.tabList = res.data
				})
			},
			
			getElementHeight(element) {
				setTimeout(()=>{
					let query = uni.createSelectorQuery().in(this);
					query.select(element).boundingClientRect();
					query.exec((res) => {
						if (!res) {//如果没获取到，再调一次
							this.getElementHeight();
						}else {
							this.swiperHeight = res[0].height;
						}
					})
				},20)
			},
			changeSwiper(e) {
				const {
					current
				} = e.detail    // 获取索引
				this.checkIndex = current
				console.log(current,'dfasd')
			},
			change(index) {
				this.current = index
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	width: 100%;
	display: flex;
}
.home  {
	display: flex;
	flex-direction: column;
	flex: 1;
	.home-list {
		flex:1;
		box-sizing: border-box;
		.list-swiper {
			height: 100%;
			.swiper-item {
				
			}
		}
	}
}
</style>
