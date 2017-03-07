<template>
	<div class="card">
		<ul class="card-content">
			<li class="card-content--item">
				<h2>城市名</h2>
				<span class="card-content--text">{{ city.name }}</span>
			</li>
			<li class="card-content--item">
				<h2>行政区(以“||”作为分隔，最后不以“||”结尾)</h2>
				<span class="card-content--text">{{ city.districts }}</span>
			</li>
		</ul>
		<ul class="card-action">
			<li>
				<router-link
						class="btn btn-md btn-blue"
						:to="{ name: 'cityEdit', params: {city} }">
					编辑
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: [ 'city' ]
	}
</script>