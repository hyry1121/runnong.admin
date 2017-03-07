<template>
	<ul class="content">
		<li class="content-item" v-for="slider in sliders">
			<Slider :slider="slider"></Slider>
		</li>
	</ul>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Slider from './../components/Slider'

	export default {
		components: { Slider },

		computed: mapGetters( ['sliders'] )
	}
</script>

<style scoped>
	.content {
		display: flex;
	}
	.content-item {
		width: 30%;
		margin-right: 5%;
	}
	.content-item:last-child {
		margin-right: 0;
	}
</style>