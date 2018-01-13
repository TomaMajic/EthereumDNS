$(document).ready(() => {
	if(typeof web3 !== undefined) {
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.log('No injected web3 found');

		var provider = 'http://localhost:8545';
		window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
	}

	console.log('Web3 provider: ', window.web3.currentProvider);
});
