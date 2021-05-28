<template>
	<view class="scroll">
		<scroll-view scroll-y class="list-scroll">
			<view>
				<slot></slot>
			</view>
			
		</scroll-view>
	</view>
</template>


<script>
	export default {
		name:"list-scroll",
		data() {
			return {
				
			};
		},
		created() {
			
		},
		methods: {
			
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
