<template>
	<div>
		<div class="action">
			Fliter
		</div>
		<ul class="content">
			<li class="content-item" v-for="city in cities">
				<div class="city">
					<router-link
							class="btn btn-md btn-blue"
							:to="{ name: 'shopEdit', params: {city} }">
						增加商店 +
					</router-link>
					<h2>{{ city.name }}</h2>
				</div>
				<ul class="shops">
					<li v-for="shop in sortedShops" v-if="shop.address.city == city.name">
						<Shop :shop="shop"></Shop>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Shop from './../components/Shop'

	export default {
		components: { Shop },

		computed: {
			...mapGetters( ['cities', 'shops'] ),
			sortedShops() {
				const len = this.shops.length
				const shops = new Array( len )
				for( let i = 0; i < len; i++ ) {
					shops[ i ] = this.shops[ i ]
				}

				return shops.sort( (a,b) => a.rank - b.rank )
			}
		}
	}
</script>

<style scoped>
	.content-item {
		margin-bottom: 30px;
	}
	.city {
		display: flex;
		margin-bottom: 10px;
		padding: 4px;
		align-items: center;
		background: rgba(0,0,0,.1);
	}
	.city h2 {
		margin-left: 20px;
		font-size: .16rem;
	}
	.shops {
		display: flex;
		flex-wrap: wrap;
	}
	.shops li {
		width: 200px;
		margin: 0 30px 30px 0;
	}
</style>