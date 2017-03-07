<template>
	<div class="shop-edit">
		<div class="card">
			<ul class="card-content">
				<li class="card-content--item">
					<h2>城市：</h2>
					<input class="card-content--inputtext" type="text" v-model="ownCity.name" />
				</li>
				<li class="card-content--item">
					<h2>行政区(以“||”作为分隔，最后不以“||”结尾)：</h2>
					<input class="card-content--inputtext" type="text" v-model="ownCity.districts" />
				</li>
			</ul>
			<ul class="card-action">
				<li>
					<button class="btn btn-lg btn-green"
							@click="save"
							:disabled="isDisabled">
						保存
					</button>
				</li>
				<li v-if="isEdit">
					<button class="btn btn-lg btn-red"
							:disabled="isDisabled"
							@click="delCity">
						删除
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import swal from 'sweetalert2'

	export default {
		data() {
			return {
				isDisabled: false,
				ownCity: {
					name: '',
					districts: ''
				},
				isEdit: false,  // 修改城市模式
				isAdd: false  // 增加城市模式
			}
		},

		created() {
			const city = this.$route.params.city
			// 修改
			if( city ) {
				this.ownCity = Object.assign( {}, city )
				this.isEdit = true
			} else {
				this.isAdd = true
			}
		},

		methods: {
			...mapActions( ['add', 'del', 'update'] ),
			save() {
				this.isDisabled = true
				// 增加城市
				if( this.isAdd ) {
					this.add({
						type: 'cities',
						data: this.ownCity
					})
					.then( result => {
						swal('添加城市成功', `${ result.name }`, 'success')
						return Promise.resolve( result )
					})
					.then( result => {
						this.$router.push({name: 'cities'})
						return Promise.resolve( result )
					})
					.catch( err => {
						this.isDisabled = false
						swal('失败', `${ err }`, 'error')
					})
				}
				// 修改城市
				if( this.isEdit ) {
					this.update({
						type: 'cities',
						data: this.ownCity
					})
					.then( ({oldData,data}) => {
						swal('更新城市成功', `${ oldData.name } => ${ data.name }`, 'success')
						return Promise.resolve()
					})
					.then( () => {
						this.$router.push({name: 'cities'})
						return Promise.resolve()
					})
					.catch( err => {
						this.isDisabled = false
						swal( '失败', `${ err }`, 'error' )
					})
				}
			},
			delCity() {
				const ownCity = this.ownCity
				swal({
					title: '删除城市',
					text: `${ ownCity.name }`,
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#d32f2f',
					cancelButtonColor: '#5eb95e',
					confirmButtonText: '删除',
					cancelButtonText: '不删除'
				}).then( () => {
					return this.del({
						type: 'cities',
						data: ownCity
					})
				}).then( () => {
					this.$router.push({name: 'cities'})
				}).catch( swal.noop )
			}
		}
	}
</script>

<style>
	.shop-edit {
		width: 500px;
		margin: 0 auto 50px auto;
	}
</style>
