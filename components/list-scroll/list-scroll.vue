<template>
	<view class="scroll">
		<scroll-view scroll-y class="list-scroll">
			<view>
				<list-card mode="base" :list="list"></list-card>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"list-scroll",
		data() {
			return {
				list: [], // 列表数据
			};
		},
		created() {
			this.getList()   // swiper列表数据
		},
		methods: {
			getList() {
				this.$api.get_list().then((res) => {
					this.list = res.data
					console.log(res,'get_list')
				})
			},
		}
	}
</script>

<style lang="scss">
.scroll {
	height: 100%;
	flex: 1;
	overflow: hidden;
	box-sizing: border-box;
	.list-scroll {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
}
</style>
