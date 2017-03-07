<template>
	<div>
		<div class="action">
			<router-link
					class="btn btn-lg btn-blue"
					:to="{ name: 'cityEdit' }">
				增加城市 +
			</router-link>
		</div>
		<ul class="content">
			<li class="content-item" v-for="city in cities">
				<City :city="city"></City>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import City from './../components/City'

	export default {
		components: { City },

		computed: mapGetters( ['cities'] ),
	}
</script>

<style scoped>
	.action {
		margin-bottom: 20px;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
	}
	.content-item {
		width: 300px;
		margin: 0 50px 50px 0;
	}
	.content-item:last-child {
		margin-right: 0;
	}
</style>