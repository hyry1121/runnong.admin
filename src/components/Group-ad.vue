<template>
	<div class="card">
		<ul class="card-content">
			<li class="card-content--item">
				<h2>链接</h2>
				<input class="card-content--inputtext" type="text"
					:disabled="isDisabled"
					v-model="groupAd.link"/>
			</li>
			<li class="card-content--item">
				<h2>图片</h2>
				<input class="card-content--inputtext" type="text"
					:disabled="isDisabled"
					v-model="groupAd.img"/>
				<img class="card-content--img---100w" v-bind:src="groupAd.img" />
			</li>
		</ul>
		<ul class="card-action">
			<li><button class="btn btn-blue btn-md" @click="edit">编辑</button></li>
			<li><button class="btn btn-green btn-md" :disabled="isDisabled" @click="save">保存</button></li>
		</ul>
	</div>
</template>

<script>
	import swal from 'sweetalert2'
	import request from './../store/request'
	
	export default {
		data() {
			return {
				isDisabled: true,
				groupAd: {
					link: '',
					img: ''
				},
				oldGroupAd: {}
			}
		},

		created() {
			request({
				type: 'group-ad',
				method: 'get'
			}).then( datas => {
				const ad = datas[ 0 ]
				this.groupAd = ad
				this.oldGroupAd = Object.assign( {}, ad )
				return Promise.resolve()
			}).catch( err => {
				swal( '错误', err, 'error' )
			})
		},

		methods: {
			edit() {
				this.isDisabled = false
			},
			save() {
				this.isDisabled = true
				request({
					type: 'group-ad',
					method: 'put',
					data: this.groupAd
				}).then( data => {
					swal( '更新团购广告成功', '', 'success' )
					return Promise.resolve()
				}).catch( err => {
					this.isDisabled = false
					swal( '错误', err, 'error' )
				})
			}
		}
	}
</script>