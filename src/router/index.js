import Vue from 'vue'
import Router from 'vue-router'
import CoinPark from '@/components/CoinPark'
import Fcoin from '@/components/Fcoin'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'coinpark',
			component: CoinPark
		},
		{
			path: '/coinpark',
			name: 'coinpark',
			component: CoinPark
		},
		{
			path: '/fcoin',
			name: 'fcoin',
			component: Fcoin
		}
	]

})
