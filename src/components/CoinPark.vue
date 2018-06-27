<template>
    <div>
        <section id="content" class="page-view">
            <div class="container">
                <div class="card m-t-25">
                    <div class="card-header">
                        <h2>概览
                            <small></small>
                        </h2>
                    </div>
                    <div class="card-body card-padding p-t-0 ng-scope">
                        <div class="row p-10 m-b-25">
                            <div class="col-md-2">
                                <div class="bgm-deeporange brd-2 p-15">
                                    <div class="c-white m-b-5">交易对</div>
                                    <h4 class="m-0 c-white f-300"><select v-model="currentPair">
                                        <template v-for="m in market_list">
                                            <option :value="m.pair">{{m.pair}}</option>
                                        </template>
                                    </select></h4>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-teal brd-2 p-15">
                                    <div class="c-white m-b-5">买一价</div>
                                    <h2 class="m-0 c-white f-300">{{ask1}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-teal brd-2 p-15">
                                    <div class="c-white m-b-5">卖一价</div>
                                    <h2 class="m-0 c-white f-300">{{bid1}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-teal brd-2 p-15">
                                    <div class="c-white m-b-5">BTC#</div>
                                    <h2 class="m-0 c-white f-300">{{assets.total_btc}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-teal brd-2 p-15">
                                    <div class="c-white m-b-5">USDT$</div>
                                    <h2 class="m-0 c-white f-300">{{assets.total_usd}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-teal brd-2 p-15">
                                    <div class="c-white m-b-5">CNY￥</div>
                                    <h2 class="m-0 c-white f-300">{{assets.total_cny}}</h2>
                                </div>
                            </div>


                            <div class="col-md-2">
                                <div class=" bgm-coinpark brd-2 p-15">
                                    <div class="c-white m-b-5">开始时间</div>
                                    <h2 class="m-0 c-white f-300">{{startTime | parseTime('HH:mm:ss')}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-coinpark brd-2 p-15">
                                    <div class="c-white m-b-5">循环/交易次数</div>
                                    <h2 class="m-0 c-white f-300">{{loops}}/{{tradeTimes}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-coinpark brd-2 p-15">
                                    <div class="c-white m-b-5">取消次数</div>
                                    <h2 class="m-0 c-white f-300">{{cancelTimes}}</h2>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-coinpark brd-2 p-15">
                                    <div class="c-white m-b-5">当前成交价格</div>
                                    <h2 class="m-0 c-white f-300">{{currentTradePrice}}</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!--/-->
                <div class="card m-t-25">
                    <div class="card-header">
                        <h2>设置
                            <small></small>
                        </h2>
                    </div>
                    <div class="card-body card-padding p-t-0 ng-scope">
                        <div class="row p-0 m-b-25">

                            <div class="col-md-2">
                                <div class="bgm-white brd-2 p-15">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>api-key</label>
                                                <input type="text" class="form-control" placeholder="api-key"
                                                       v-model="apikey">
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>api-secret</label>
                                                <input type="password" class="form-control" placeholder="api-secret"
                                                       v-model="secret">
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>


                            <div class="col-md-2">
                                <div class="bgm-white brd-2 p-15">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="fg-line" v-line>
                                                <label>时间间隔（默认10s）</label>
                                                <input type="text" class="form-control" placeholder="默认10s"
                                                       v-model="intervalTime">
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>交易并发数（默认3对）</label>
                                                <input type="text" class="form-control" placeholder="默认3对"
                                                       v-model="tradePairCount">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-2">
                                <div class="bgm-white brd-2 p-15">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>价格（最大值可不选）</label>
                                                <input type="text" class="form-control" placeholder=""
                                                       v-model="maxPrice">
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>价格（最小值可不选）</label>
                                                <input type="text" class="form-control" placeholder=""
                                                       v-model="minPrice">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-white brd-2 p-15">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>每次交易币数</label>
                                                <input type="text" class="form-control" placeholder="默认1"
                                                       v-model="tradeCoinCount">
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <div class="fg-line">
                                                <label>最大交易次数</label>
                                                <input type="text" class="form-control" placeholder="默认100"
                                                       v-model="maxTradeTimes">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="bgm-white brd-2 p-15">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <div class="btn btn-primary waves-effect" @click="start">开始</div>
                                            <div class="btn btn-default waves-effect" @click="stop">停止</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">

                    <div class="col-md-6 ">
                        <assets :_list="assets_list"></assets>
                    </div>

                    <div class="col-md-6">
                        <pending-order :_list="pending_list" @cancelOrder="getUserOrderPending"></pending-order>
                    </div>

                    <div class="col-md-12">
                        <history-order :_list="history_list" :_pair="currentPair"></history-order>
                    </div>
                </div>
            </div>
        </section>

    </div>

</template>

<script>


	import service from '@/coinpark';
	import strategy from '@/strategy';
	import HistoryOrder from '@/components/HistoryOrder';
	import Assets from '@/components/Assets';
	import PendingOrder from '@/components/PendingOrder';
	import _ from 'underscore';
	import toastr from './toastr';

	export default {
		data() {
			return {
				list: [],
				currentPair: 'BIX_ETH',
				working: false,
				assets: {},
				market_list: [],
				assets_list: [],
				pending_list: [],
				history_list: [],
				showDetail: false,
				totalVotes: 0,
				ask1: 0,
				bid1: 0,
				multipleSelection: [],

				apikey: '',
				secret: '',
				minPrice: '',
				maxPrice: '',

				tradeCoinCount: 1,
				tradePairCount: 3, // 每次成交对数
				intervalTime: 10,
				resetIntervalTime: 60 * 5,

				workingInterval: null,
				resetInterval: null,

				storage: window.localStorage,

                startTime : '',     // 开始时间
                tradeTimes : 0,    // 交易次数
                loops: 0,    // 循环次数
                cancelTimes : 0 ,   // 订单取消次数
                currentTradePrice : 0 ,   //  当前成交价格
				maxTradeTimes : 100 ,   //  当前成交价格




			}
		},
		components: {
			HistoryOrder, Assets, PendingOrder
		},


		methods: {

			getUserAssets() {
				var me = this;
				service.getUserAssets().then(function (res) {
					me.assets = res.result
					me.assets_list = res.result.assets_list
				});
			},

			getMarketAll() {
				var me = this;
				service.getMarketAll().then(function (res) {
					var list = res.result
					_.each(list, function (item) {
						item.pair = item.coin_symbol + '_' + item.currency_symbol;

					});

					me.market_list = list
				});
			},


			//  获取用户委托单
			getUserOrderPending() {
				var me = this;
				service.getUserOrderPending(this.currentPair).then(function (res) {
					console.log(res)
					me.pending_list = res.result.items
				});
			},


			//  获取用户委托交易历史
			getUserOrderHistory() {
				var me = this;
				service.getUserOrderHistory(this.currentPair).then(function (res) {
					console.log('getUserOrderHistory', res)
					me.history_list = res.result.items;
				});
			},

			// 创建订单 买/卖
			createOrder(pair, side, price, amount) {
				let trade_order = {
					account_type: 0,
					order_type: 2,
					order_side: side, //交易方向，1-买，2-卖
					pair: pair,
					price: price,
					amount: amount,
				};

				return service.newOrder(trade_order)
			},


			async getMiddlePrice() {
				return service.getMiddlePrice(this.currentPair);
			},


			async test() {
				let price = await this.getMiddlePrice('BIX_ETH');
				let mPrice = price.m;
				console.log('price', mPrice)
				this.createOrder('BIX_ETH', 2, mPrice, 1);
				this.createOrder('BIX_ETH', 1, mPrice, 1);
			},

			async buyAndSell() {
                let count = parseInt(this.tradePairCount);


                var p = [];
                for (var i = 0; i < count; i ++ ){
                	p.push(this.createOrder(this.currentPair, 2, this.currentTradePrice, this.tradeCoinCount))
                	p.push(this.createOrder(this.currentPair, 1, this.currentTradePrice, this.tradeCoinCount))
                }

                var tradeRes = await Promise.all(p);
                toastr.success(`${count}对交易成功`);

                console.info('tradeRes',tradeRes)

                this.getUserOrderPending();
                this.getUserOrderHistory();

                this.tradeTimes += count;
                if (this.tradeTimes >= this.maxTradeTimes) {
                	this.stop();
                }


			},

			initData() {
				let keys = ['apikey', 'secret', 'minPrice', 'maxPrice', 'tradePairCount', 'tradeCoinCount', 'intervalTime','currentPair', 'maxTradeTimes'];
				_.each(keys, key => {
					this[key] = localStorage.getItem(key) || '';
				});
			},

            start() {

				let me = this;
				if (this.workingInterval) {
					clearInterval(this.workingInterval)
				}

				this.startTime = + new Date;

				this.workingInterval = setInterval(async function () {
					let price = await me.getMiddlePrice();

					console.log('price',price);
					me.ask1 = price.ask1;
					me.bid1 = price.bid1;
					me.currentTradePrice = price.m;

					if (me.currentTradePrice) {
						console.info('currentTradePrice', me.currentTradePrice)
						me.buyAndSell();
                    }

					me.loops ++ ;


				}, this.intervalTime * 1000);

				toastr.info('start');


				// reset
				if (this.resetInterval) {
					clearInterval(this.resetInterval)
				}

				this.resetInterval = setInterval(function () {
					me.reset();
				}, this.resetIntervalTime * 1000)

			},

			stop() {
				if (this.workingInterval) {
					clearInterval(this.workingInterval)
				}

				this.startTime = '';
				this.tradeTimes = 0;
				this.loops = 0;
				this.cancelTimes = 0;

				toastr.success('交易停止');
			},

			reset() {
				// 取消全部订单
				if (this.workingInterval) {
					clearInterval(this.workingInterval)
				}
				this.startTime = '';
				this.tradeTimes = 0;
				this.loops = 0;
				this.cancelTimes = 0;

			}

		},

		watch: {
			apikey(val) {
				this.storage.setItem('apikey', val);
				if (this.secret) {
					this.getMarketAll();
					this.getUserAssets();
				}
			},

			secret(val) {
				this.storage.setItem('secret', val);
				if (this.apikey) {
					this.getMarketAll();
					this.getUserAssets();
                }
			},

			minPrice(val) {
				this.storage.setItem('minPrice', val);
				this.minPrice = val;
			},

			maxPrice(val) {
				this.storage.setItem('maxPrice', val);
				this.maxPrice = val;
			},

			tradePairCount(val) {
				this.storage.setItem('tradePairCount', val || 3);
				this.tradePairCount = val;
			},

			tradeCoinCount(val) {
				this.storage.setItem('tradeCoinCount', val || 1);
				this.tradeCoinCount = val;
			},

			intervalTime(val) {
				this.storage.setItem('intervalTime', val || 10);
				this.intervalTime = val;
			},

			maxTradeTimes(val) {
				this.storage.setItem('maxTradeTimes', val || 10);
				this.maxTradeTimes = val;
			},

			currentPair(val) {
				this.storage.setItem('currentPair', val || 'BIX_ETH');
				this.currentPair = val;

				this.getUserOrderHistory();
				this.getUserOrderPending();
			},

		},


		mounted() {
			this.initData();

			console.info(this.apikey)
			console.info(this.secret)

			if (!this.apikey || !this.secret) {
				toastr.error('请输入正确的apikey和secret');
				return;
			}


			this.getUserAssets();
			this.getUserOrderPending();
			this.getUserOrderHistory('BIX_ETH');
			this.getMarketAll();
		}
	}
</script>
<style>

    @media (min-width: 1200px) {
        .container {
            width: 100%;
        }
    }

    select {
        background: transparent;
        border: none;
        font-size: 19px;
    }


</style>