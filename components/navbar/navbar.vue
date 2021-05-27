<template>
	<view class="navbar">
		<view class="navbar-fixed"> 
		     <!-- 顶部状态栏 -->
			<view :style="{height:statusBarHeight + 'px'}"></view> 
			<view class="navbar-content" :style="{height: navHeight + 'px', width: windowWidth + 'px'}">
				<ivew class="navbar-search" >
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16"></uni-icons>
					</view>
					<view class="navbar-search_text">1234</view>
				</ivew>
			</view>
			
		</view>
		<view :style="{height: statusBarHeight + navHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"navbar",
		data() {
			return {
				statusBarHeight: 20 , // 手机状态栏高度 
				navHeight: 45,        // 导航栏高度
				windowWidth: 375,       // 搜索栏宽度
			};
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			console.log(info, 'info')
			// 状态栏高度 statusBarHeight
			this.statusBarHeight = info.statusBarHeight
			// 非微信的宽度
			this.windowWidth = info.windowWidth
			
			// 获取胶囊位置
			// h5 app mp-alipay 不支持胶囊
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const buttonMenuInfo = uni.getMenuButtonBoundingClientRect()
			console.log(buttonMenuInfo, 'buttonMenuInfo')
			// 导航栏高度 = （胶囊顶部高度 - 状态栏高度） + 胶囊底部高度 - 状态栏高度
			this.navHeight = buttonMenuInfo.top - this.statusBarHeight + buttonMenuInfo.bottom - this.statusBarHeight
			this.windowWidth = buttonMenuInfo.left
			// #endif
		}
	}
</script>

<style lang="scss">
    .navbar {
		.navbar-fixed {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			background-color: $base-color;
			.navbar-content {
				padding: 0 15px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.navbar-search {
					width: 100%;
					height: 30px;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					border-radius: 30px;  // 设置为跟高度一样就有圆弧效果
					background-color: white;
					.navbar-search_icon {
						
						// height: 10px;
						// border: 1px solid black;
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-searh_text {
						width: 100%;
						height: 30px;
					}
				}
			}
		}
	}
</style>
