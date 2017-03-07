<template>
	<div class="card">
		<ul class="card-content">
			<li class="card-content--item">
				<h2>链接</h2>
				<input class="card-content--inputtext" type="text"
					:disabled="isDisabled"
					v-model="ownSlider.link"/>
			</li>
			<li class="card-content--item">
				<h2>显示</h2>
				<input class="card-content--inputcheckbox" type="checkbox"
					:disabled="isDisabled"
					v-model="ownSlider.show"/>
			</li>
			<li class="card-content--item">
				<h2>图片</h2>
				<input class="card-content--inputtext" type="text"
					:disabled="isDisabled"
					v-model="ownSlider.img"/>
				<img class="card-content--img---100w" :src="ownSlider.img" />
			</li>
		</ul>
		<ul class="card-action">
			<li><button class="btn btn-blue btn-md" @click="edit">编辑</button></li>
			<li><button class="btn btn-green btn-md" :disabled="isDisabled" @click="save">保存</button></li>
		</ul>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import swal from 'sweetalert2'
	
	export default {
		props: [ 'slider' ],

		data() {
			return {
				isDisabled: true,
				ownSlider: {}
			}
		},

		created() {
			this.ownSlider = Object.assign( {}, this.slider )
		},

		methods: {
			...mapActions( ['update'] ),
			edit() {
				this.isDisabled = false
			},
			save() {
				this.isDisabled = true
				const slider = this.slider,
							ownSlider = this.ownSlider
				
				this.update({
					type: 'sliders',
					data: ownSlider
				})
				.then( ({oldData,data}) => {
					return swal( '更新幻灯片成功', `${ oldData.title } => ${ data.title }`, 'success' )
				})
				.catch( err => {
					this.isDisabled = false
					swal( '失败', `${ err }`, 'error' )
				})
			}
		}
	}
</script>