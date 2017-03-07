<template>
	<div class="card">
		<ul class="card-content">
			<li class="card-content--item">
				<h2>商店名</h2>
				<span class="card-content--text">{{ shop.name }}</span>
			</li>
			<li class="card-content--item">
				<h2>logo</h2>
				<img class="card-content--img---100w" :src="shop.logo" />
			</li>
		</ul>
		<ul class="card-action">
			<li>
				<router-link
						class="btn btn-md btn-blue"
						:to="{ name: 'shopEdit', params: {shop} }">
					编辑
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: [ 'shop' ]
	}
</script>