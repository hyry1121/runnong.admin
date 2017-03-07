import Vue from 'vue'
import Router from 'vue-router'

import Index from './../views/index'
import Sliders from './../views/sliders'
import Cities from './../views/cities'
import Shops from './../views/shops'
import CityEdit from './../views/city.edit'
import ShopEdit from './../views/shop.edit'

Vue.use( Router )

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		},
		{
			path: '/sliders',
			name: 'sliders',
			component: Sliders
		},
		{
			path: '/cities',
			name: 'cities',
			component: Cities
		},
		{
			path: '/shops',
			name: 'shops',
			component: Shops
		},
		{
			path: '/city-edit',
			name: 'cityEdit',
			component: CityEdit
		},
		{
			path: '/shop-edit',
			name: 'shopEdit',
			component: ShopEdit
		}
	]
})
