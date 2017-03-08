<template>
	<div class="shop-edit">
		<div class="card">
			<ul class="card-content">
				<li class="card-content--item">
					<h2>商店名</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.name" />
				</li>
				<li class="card-content--item">
					<h2>城市</h2>
					<span class="card-content--text" v-if="isAdd">{{ ownCity.name }}</span>
					<span class="card-content--text" v-if="isEdit">{{ ownShop.address.city }}</span>
				</li>
				<li class="card-content--item">
					<h2>行政区</h2>
					<ul class="card-content--inputradio" v-if="isAdd">
						<li v-for="(district, index) in ownCity.districts">
							<input type="radio"
								v-model="ownShop.address.district"
								:value="district"
								:id="`district-${ index }`" />
							<label :for="`district-${ index }`">{{ district }}</label>
						</li>
					</ul>
					<span class="card-content--text" v-if="isEdit">{{ ownShop.address.district }}</span>
				</li>
				<li class="card-content--item">
					<h2>详细地址</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.address.detail" />
				</li>
				<li class="card-content--item">
					<h2>简介</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.desc" />
				</li>
				<li class="card-content--item">
					<h2>商店链接</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.link" />
				</li>
				<li class="card-content--item">
					<h2>logo</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.logo" />
					<img class="card-content--img---md" :src="ownShop.logo">
				</li>
				<li class="card-content--item">
					<h2>联系电话</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.tel" />
				</li>
				<li class="card-content--item">
					<h2>星级(纯数字 1-5)</h2>
					<input class="card-content--inputnumber" type="number" v-model="ownShop.star" />
				</li>
				<li class="card-content--item">
					<h2>起送价(纯数字)</h2>
					<input class="card-content--inputnumber" type="number" v-model="ownShop.priceBeforePost" />
				</li>
				<li class="card-content--item">
					<h2>配送价(纯数字)</h2>
					<input class="card-content--inputnumber" type="number" v-model="ownShop.postage" />
				</li>
				<li class="card-content--item">
					<h2>显示</h2>
					<input class="card-content--inputcheckbox" type="checkbox" v-model="ownShop.show" />
				</li>
				<li class="card-content--item">
					<h2>推荐</h2>
					<input class="card-content--inputcheckbox" type="checkbox" v-model="ownShop.recommend" />
				</li>
				<li class="card-content--item">
					<h2>排名(纯数字 越小越靠前 默认99)</h2>
					<input class="card-content--inputnumber" type="number" v-model="ownShop.rank" />
				</li>
				<li class="card-content--item">
					<h2>营业时间(00:00 - 12:12)</h2>
					<input class="card-content--inputtext" type="text" v-model="ownShop.openTime" />
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
							@click="delShop">
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
				ownShop: {
					name: '',
					address: {
						city: '',
						district: '',
						detail: ''
					},
					desc: '',
					link: '',
					logo: '',
					tel: '',
					star: 1,
					show: true,
					postage: 0,  // 配送价
					priceBeforePost: 0,  // 起送价
					recommend: false,
					rank: 99,
					openTime: ''
				},
				ownCity: {},
				isEdit: false,  // 修改商店模式
				isAdd: false  // 增加商店模式
			}
		},

		created() {
			const { city, shop } = this.$route.params
			// 修改
			if( shop ) {
				this.ownShop = Object.assign( {}, shop )
				this.isEdit = true
			}
			else if( city ) {
				this.ownCity = Object.assign( {}, city )
				// 'xx区||yy区' => ['xx区', 'yy区']
				this.ownCity.districts = this.ownCity.districts.split( '||' )
				this.isAdd = true
				// 设置商店的城市
				this.ownShop.address.city = this.ownCity.name
			}
			// 在本页面进行刷新的会丢失数据 进行路由跳回去
			else {
				this.$router.push({name: 'shops'})
			}
		},

		methods: {
			...mapActions( ['add', 'del', 'update'] ),
			save() {
				this.isDisabled = true
				// 增加商店
				if( this.isAdd ) {
					this.add({
						type: 'shops',
						data: this.ownShop
					})
					.then( result => {
						swal('添加商店成功', `${ result.name }`, 'success')
						return Promise.resolve( result )
					})
					.then( result => {
						this.$router.push({name: 'shops'})
						return Promise.resolve( result )
					})
					.catch( err => {
						this.isDisabled = false
						swal('失败', `${ err }`, 'error')
					})
				}
				// 修改商店
				if( this.isEdit ) {
					this.update({
						type: 'shops',
						data: this.ownShop
					})
					.then( ({oldData,data}) => {
						swal('更新商店成功', `${ oldData.name } => ${ data.name }`, 'success')
						return Promise.resolve( {oldData,data} )
					})
					.then( ({oldData,data}) => {
						this.$router.push({name: 'shops'})
						return Promise.resolve( {oldData,data} )
					})
					.catch( err => {
						this.isDisabled = false
						swal('失败', `${ err }`, 'error')
						console.error( err )
					})
				}
			},
			delShop() {
				const ownShop = this.ownShop
				swal({
					title: '删除店铺',
					text: `${ ownShop.name }`,
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#d32f2f',
					cancelButtonColor: '#5eb95e',
					confirmButtonText: '删除',
					cancelButtonText: '不删除'
				}).then( () => {
					return this.del( {
						type: 'shops',
						data: ownShop
					})
				}).then( () => {
					this.$router.push({name: 'shops'})
				}).catch( err => {
					swal('失败', `${ err }`, 'error')
				})
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
