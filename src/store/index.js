import Vue from 'vue'
import Vuex from 'vuex'
import request from './request'

const debug = process.env.NODE_ENV !== 'production'

Vue.use( Vuex )
Vue.config.debug = debug

export default new Vuex.Store({
	strict: debug,
	
	state: {
		sliders: [],
		cities: [],
		shops: []
	},

	mutations: {
		/*
			ADD({
				type: 'shops',
				data: shop
			})
		 */
		ADD( state, {type, data} ) {
			state[ type ].push( data )
		},
		DEL( state, {type, data} ) {
			const newData = state[ type ].filter( item => {
				return item._id != data._id
			})
			Vue.set( state, type, newData )
		},
		UPDATE( state, {type, data} ) {
			for( let i = 0; i < state[type].length; i++ ) {
				if( state[type][i]._id == data._id ) {
					state[type][i] = data
					return
				}
			}
		},
		SET( state, {type, datas} ) {
			Vue.set( state, type, datas )
		}
	},

	actions: {
		add( {commit}, {type, data} ) {
			return request({
				method: 'post',
				type,
				data,
			})
			.then( data => {
				commit( 'ADD', {type, data} )
				return Promise.resolve( data )
			})
		},
		del( {commit}, {type, data} ) {
			return request({
				method: 'delete',
				type,
				data,
			})
			.then( data => {
				commit( 'DEL', {type, data} )
				return Promise.resolve( data )
			})
		},
		update( {commit}, {type, data} ) {
			return request({
				method: 'put',
				type,
				data,
			})
			.then( oldData => {
				commit( 'UPDATE', {type, data} )
				return Promise.resolve( {data, oldData})
			})
		},
		fetch( {commit}, {type} ) {
			return request({
				method: 'get',
				type
			})
			.then( datas => {
				commit( 'SET', {type, datas} )
				return Promise.resolve( datas )
			})
		}
	},

	getters: {
		sliders( state ) {
			return state.sliders
		},
		cities( state ) {
			return state.cities
		},
		shops( state ) {
			return state.shops
		}
	}
})