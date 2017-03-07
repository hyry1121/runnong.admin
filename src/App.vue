<template>
	<div id="app">
		<header class="header">
			<img src="./assets/imgs/profile.jpg" />
			<h1>{{ title }}</h1>
			<ul>
				<li><router-link :to="{ name: 'index' }">主页</router-link></li>
				<li><router-link :to="{ name: 'sliders' }">幻灯片</router-link></li>
				<li><router-link :to="{ name: 'cities' }">城市</router-link></li>
				<li><router-link :to="{ name: 'shops' }">商店</router-link></li>
			</ul>
		</header>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import swal from 'sweetalert2'

	export default {
		name: 'app',

		computed: {
			title() {
				switch( this.$route.name ) {
					case 'index': return '主页状态'
					case 'sliders': return '幻灯片'
					case 'cities': return '城市'
					case 'shops': return '商店'
					case 'shopEdit': return '商店编辑'
				}
			}
		},

		created() {
			this.fetch( {type: 'sliders'} ).catch( err => {
				swal( '错误，无法获取幻灯片', `${ err }`, 'error' )
			})
			this.fetch( {type: 'cities'} ).catch( err => {
				swal( '错误，无法获取城市', `${ err }`, 'error' )
			})
			this.fetch( {type: 'shops'} ).catch( err => {
				swal( '错误，无法获取商店', `${ err }`, 'error' )
			})
		},

		methods: {
			...mapActions( ['fetch'] )
		}
	}
</script>

<style scoped>
	.header {
		display: flex;
		height: 60px;
		justify-content: space-between;
		align-items: center;
		padding: 0 50px;
		background-color: #333333;
	}
	.header img {
		width: 50px;
		height: 50px;
	}
	.header h1 {
		color: #fff;
		font-size: .2rem
	}
	.header ul {
		display: flex;
	}
	.header ul li {
		padding: 0 10px;
	}
	.header a {
		color: #fff;
		font-size: .16rem;
	}
	.header a:hover {
		font-weight: 800;
	}

	.content {
		margin-top: 50px;
		padding: 0 20px;
	}
</style>