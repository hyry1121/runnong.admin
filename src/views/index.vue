<template>
	<div>
		<div class="index-item">
			<h2>团购广告</h2>
			<Group-ad></Group-ad>
		</div>
	</div>
</template>

<script>
	import GroupAd from './../components/Group-ad'

	export default {
		components: { GroupAd }
	}
</script>

<style>
	.index-item {
		width: 400px;
	}
	.index-item h2 {
		padding: 4px;
		font-size: .2rem;
	}
</style>