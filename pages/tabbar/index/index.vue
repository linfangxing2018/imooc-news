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
				 :key="index"
				>
					<list-scroll>
						<list-card :list="listCacheData[index]"></list-card>
					</list-scroll>
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
				//list: [], // 列表数据
				listCacheData: {},   // 缓存列表数据
			}
		},
		// 页面使用onLoad，组件使用created
		onLoad() {
			this.getLabel()   // tab数据
			//swiper高度自适应
			this.getElementHeight('.swiper-item')
			
			// 有时候在这里拿不到tablist中的值。我们通过监听tablist变化就行
			//this.getList(0)   // swiper列表数据, 默认首页展示后端开发的数据
		},
		watch: {
			tabList(newVal) {
				console.log(newVal,'new')
				if (newVal.length == 0) return
				this.getList(this.current)
			}
			
		},
		methods: {
			getLabel() {
				this.$api.get_label().then((res) => {
					console.log(res,'res')
					this.tabList = res.data
				})
			},
			
			getList(current) {
				this.$api.get_list({
					name: this.tabList[current].name
					}).then((res) => {
						const {
							data
						} = res
					// this.list = res.data
					// vue中直接改变对象或者数组不生效，使用$set修改或者assgin,第二个参数为索引
						//数据懒加载
					this.$set(this.listCacheData, current, data)
				
					
					console.log(this.listCacheData,'get_list')
				})
			},
			getElementHeight(element) {
				setTimeout(()=>{
					let query = uni.createSelectorQuery().in(this);
					query.select(element).boundingClientRect();
					query.exec((res) => {
						console.log(res,'fdsfasf')
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
				console.log(current,'current')
				console.log(this.tabList[current],'lin')
				
				this.checkIndex = current
				// 当数据不存在或者长度为0才去请求数据 
				if (!this.listCacheData[current] || this.listCacheData.length == 0) {
					this.getList(current)
				}
				
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
