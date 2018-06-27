var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var _ = require('underscore');
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/metamask"));

async function transferOutToken( token ,sendItem , receiveAddress, index){

	const contract = new web3.eth.Contract(token.abi, token.address);
	var balance = await contract.methods.balanceOf(sendItem.address).call();
	var count = await web3.eth.getTransactionCount(sendItem.address) ;

	if (balance == 0 || !sendItem.privkey) {
		return
	}


	console.log('token-balance-count', balance, count ,index);

	var rawTransaction = {
		"from": sendItem.address,
		"nonce": "0x" + count.toString(16),
		"gasPrice": token.gasPriceHex,
		"gasLimit": token.gasLimitHex,
		"to": token.address,
		"value": "0x0",
		"data": contract.methods.transfer(receiveAddress, web3.utils.toHex(balance)).encodeABI(),
		// "chainId": chainId,
	};

	var privKey = new Buffer(sendItem.privkey, 'hex');
	var tx = new Tx(rawTransaction);
	tx.sign(privKey);
	var serializedTx = tx.serialize();
	console.log('sending', sendItem.address)

	try {
		var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
		console.log(`Receipt info: \n${JSON.stringify(receipt, null, '\t')}`);

		return receipt;

	}catch (e) {
		return { error : 2}
	}
}


async function _checkTokenBalance(token, item, index) {
	const contract = new web3.eth.Contract(token.abi, token.address);
	try {
		var balance = await contract.methods.balanceOf(item.address).call();
		console.log(index , item.address, balance);
		return ( balance -0 )/ (1**token.decimal)
	}catch (e) {
		return 'none';
	}
}


async function _checkETHBalance(address, index) {
	try {
		var balance = await web3.eth.getBalance(address) ;
		console.log(index , address, balance);
		return ( balance - 0 ) / 1e18
	}catch (e) {
		return 'none';
	}
}

export default {
	web3, _checkTokenBalance, _checkETHBalance
}