import axios from 'axios'

// 检查 axios 的状态码
function checkStatus( res ) {
	if( res.status >= 200 && res.status<300 ) {
		return Promise.resolve( res )
	} else {
		return Promise.reject( new Error(res.statusText) )
	}
}

// 转换 api 的类型
function transformApiType( type ) {
	switch( type ) {
		case 'sliders': return 'slider'
		case 'cities': return 'city'
		case 'shops': return 'shop'
		default: return type
	}
}

export default ( {type, method, data} ) => {
	const typeForApi = transformApiType( type )
	return axios({
		url: 'http://localhost:3000/api/' + typeForApi,
		timeout: 4000,
		method,
		data,
	})
	.then( res => {
		return checkStatus( res )
	})
	.then( res => {
		const data = res.data
		if( data.success ) {
			return Promise.resolve( data.result )
		} else {
			return Promise.reject( data.error )
		}
	})
}