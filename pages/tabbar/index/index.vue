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
					<list-scroll @load='load'>
						<list-card :list="listCacheData[index]"></list-card>
						<uni-load-more  v-if="listCacheData[index].length === 0 || listCacheData[index].length > 7" :status="loadPage[index].load"></uni-load-more>
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
				listCacheData: {},   // 缓存列表数据
				loadPage: {},       // 切换标签从第一页开始请求
				pageSize: 10,
				// loadStatus: 'loading',  // 加载更多初始状态
			}
		},
		// 页面使用onLoad，组件使用created
		onLoad() {
			this.getLabel()   // tab数据
			//swiper高度自适应
			this.getElementHeight('.swiper-item')
			
			// 有时候在这里拿不到tablist中的值。我们通过监听tablist变化就行
			// this.getList(0)   // swiper列表数据, 默认首页展示后端开发的数据
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
					// 在数组头部添加一个全部字段
					this.tabList.unshift({
						name: '全部'
					})
				})
			},
			
			getList(current) {
				if (!this.loadPage[current]) {
					this.loadPage[current] = {
						page: 1,
						load: 'loading',
					}
				}
				this.$api.get_list({
					name: this.tabList[current].name,
					page: this.loadPage[current].page,
					pageSize: this.pageSize
					}).then((res) => {
						const {
							data
						} = res
					// vue中直接改变对象或者数组不生效，使用$set修改或者assgin,第二个参数为索引
					//数据懒加载
					
					if (data.length == 0) {
						let oldLoad = {}
						oldLoad.load = 'nomore'
						oldLoad.page = this.loadPage[current].page
						this.$set(this.loadPage, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					
				
				    let oldData = this.listCacheData[current] || [] // 保存上一页的数据
					oldData.push(...data)
					this.$set(this.listCacheData, current, oldData)
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
				this.page = 1
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
			},
			// 加载更多数据
			load() {
				console.log('触发下拉')
				if (this.loadPage[this.current].load === 'nomore') return
				this.loadPage[this.current].page++
				this.getList(this.current)
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
