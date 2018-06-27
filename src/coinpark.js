let CryptoJS = require("crypto-js");
let request = require("request");
let _ = require("underscore");
let toastr = require('toastr');

let key = function () {
	return window.localStorage.getItem('apikey')
};

let secret = function () {
	return window.localStorage.getItem('secret')
};


let doPost = function (url, params, callBack) {
	function action(_callback) {
		request.post({url: url, form: params}, function (error, response, body) {
			let payload;
			try {
				payload = JSON.parse(body);
			}catch (e) {
				payload = body;
			}

			if(error) {
				_callback(error, payload)
			}
			else if(response.statusCode < 200 || response.statusCode > 299) {
				_callback(new Error(`Response code ${response.statusCode}`), payload)
			} else {
				_callback(error, payload)
			}
		});
	}

	if (callBack) {
		action(callBack)
	} else {
		return new Promise((resolve, reject)=>{
			action((err, payload)=>{
				if (err) {
					if (payload === undefined) {
						reject(err)
					} else {
						reject(payload)
					}
				}else {
					console.log('payload-', payload)
					if(payload.error) {
						toastr.error(payload.error.msg + ',code :' + payload.error.code)
						reject(payload.error)
					}

                    if (_.isArray(payload.result)){
                        resolve(payload.result[0])
                    }else {
                        resolve(payload.result)
                    }
				}
			})

		})
	}


};

let doGet = function (url, callBack) {

	function action(_callback) {
		request.get({url: url}, function (error, response, body) {

			let payload;
			try {
				payload = JSON.parse(body);
			}catch (e) {
				payload = body;
			}


			if(error) {
				_callback(error, payload)
			}
			else if(response.statusCode < 200 || response.statusCode > 299) {
				_callback(new Error(`Response code ${response.statusCode}`), payload)
			} else {
				_callback(error, payload)
			}
		});
	}

	if (callBack) {
		action(callBack)
	} else {
		return new Promise((resolve, reject)=>{
			action((err, payload)=>{
				if (err) {
					if (payload === undefined) {
						reject(err)
					} else {
						reject(payload)
					}
				}else {
					if (_.isArray(payload.result)){
                        resolve(payload.result[0])
                    }else {
                        resolve(payload.result)
					}
				}
			})

		})
	}

};

let getSign = function (data) {
	var sign = CryptoJS.HmacMD5(JSON.stringify(data), secret()).toString();
	return sign;
};

let doApiRequestWithApikey = function (url, cmds) {
	let form = {
		cmds: JSON.stringify(cmds),
		apikey: key(),
		sign: getSign(cmds)
	};

	return doPost(url, form);
};

let doApiRequest = function (url, cmds, callBack) {
	let form = {
		cmds: JSON.stringify(cmds)
	};
	return doPost(url, form)
};


// public api

let getDepth = async function (pair, size) {
	let get_url = 'https://api.coinpark.cc/v1/mdata?cmd=depth&pair=' + pair + '&size=' + size;
	return doGet(get_url)
};


let getMiddlePrice = async function (pair) {
	var middlePrice = 0;
	var res = await getDepth(pair, 1);
    var ask1 = res.asks[0].price;
    var bid1 = res.bids[0].price;

    if (ask1* 1e8 - bid1 *1e8 >= 2) {
		 middlePrice = parseFloat((parseFloat(ask1) + parseFloat(bid1))/2).toFixed(8);
	}

    return {
    	ask1 : ask1,
		bid1 : bid1,
    	m : middlePrice,
	}
};




let getDeals = function (pair, size) {
	let cmds = [
		{
			cmd: "api/deals",
			body: {
				pair: pair,
				size: size
			}
		}
	];
	let url = 'https://api.coinpark.cc/v1/mdata';
	return doApiRequest(url, cmds);
};


let getKline = function (pair, period, size) {
	let cmds = [
		{
			cmd: "api/kline",
			body: {
				pair: pair,
				period: period,
				size: size
			}
		}
	];
	let url = 'https://api.coinpark.cc/v1/mdata';
	return doApiRequest(url, cmds);
};

let getTicker = function (pair) {
	let cmds = [
		{
			cmd: "api/ticker",
			body: {
				pair: pair
			}
		}
	];

	let url = 'https://api.coinpark.cc/v1/mdata';
	return doApiRequest(url, cmds);
};

let getMarket = function (pair) {
	let cmds = [
		{
			cmd: "api/market",
			body: {
				pair: pair
			}
		}
	];

	let url = 'https://api.coinpark.cc/v1/mdata';
	return doApiRequest(url, cmds);
};

let getMarketAll = function () {
	let cmds = [
		{
			cmd: "api/marketAll",
			body: {}
		}
	];

	let url = 'https://api.coinpark.cc/v1/mdata';
	return doApiRequest(url, cmds);
};


let getUserOrderPending = function (pair, account_type, page, size) {
	let cmds = [
		{
			cmd: "orderpending/orderPendingList",
			body: {
				pair: pair,
				account_type: account_type || 0,
				page: page || 1,
				size: size || 50
			}
		}
	];

	let url = 'https://api.coinpark.cc/v1/orderpending';
	return doApiRequestWithApikey(url, cmds);
};

let getUserOrderHistory = function (pair, account_type, page, size) {
	let cmds = [
		{
			cmd: "orderpending/pendingHistoryList",
			body: {
				pair: pair,
				account_type: account_type || 0,
				page: page || 1,
				size: size || 50
			}
		}
	];
	let url = 'https://api.coinpark.cc/v1/orderpending';
	return doApiRequestWithApikey(url, cmds);
};







let newOrder = function (trade_order) {
	let cmds = [
		{
			cmd: "orderpending/trade",
			body: {
				pair: trade_order.pair,
				account_type: trade_order.account_type,
				order_type: trade_order.order_type,
				order_side: trade_order.order_side,
				// pay_bix: trade_order.pay_bix,
				price: trade_order.price,
				amount: trade_order.amount,
				// money: trade_order.money,
			}
		}
	];
	let url = 'https://api.coinpark.cc/v1/orderpending';
	return doApiRequestWithApikey(url, cmds);
};

let cancelOrder = function (orders_id) {
	let cmds = [
		{
			cmd: "orderpending/cancelTrade",
			body: {
				orders_id: orders_id
			}
		}
	];
	let url = 'https://api.coinpark.cc/v1/orderpending';
	return doApiRequestWithApikey(url, cmds);
};

let getUserAssets = function () {
	let cmds = [
		{
			cmd: "transfer/assets",
			body: {
				select: 1
			}
		}
	];
	let url = 'https://api.coinpark.cc/v1/transfer';
	return doApiRequestWithApikey(url, cmds);
};

export default {
	getDepth,getDeals,getKline,getTicker,getMarketAll,getMarket,getUserOrderPending,getUserOrderHistory,newOrder,cancelOrder,getUserAssets, getMiddlePrice
}
