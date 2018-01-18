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

$(document).on('click', '.home-tab', () => {
	switchToHomeTab();
});

$(document).on('click', '.buy-tab', () => {
	switchToBuyTab();
});

$(document).on('click', '.buy-btn', () => {
	var contractAbi = '[{"constant": false,"inputs": [{"name": "domain","type": "string"}],"name": "deleteDomain","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "domain","type": "string"}],"name": "resolveDomain","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "domain","type": "string"},{"name": "ip_addr","type": "string"}],"name": "buyDomain","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "newPrice","type": "uint256"}],"name": "updateCurrentPrice","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getCurrentPrice","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}]';
    var contractAddress = '0x8Ef749513F863B4C1760fBEDB4dCE7e61D82B9a9';
    var dnsContract = createContract(contractAbi, contractAddress);

    var priceInWei = 0;
    dnsContract.getCurrentPrice.call((err, res) => {
    	if(err) {
    		console.log('Error: ', err);
    	} else {
    		priceInWei = res.c[0];
    	}
    }); 

   	var html;
   	setTimeout(() => {
   		html = getBuyModalHtml(priceInWei)
   		__Modals.openModal();
   		$('.modal').fadeIn(200).append(html);
   	}, 600);
});

$(document).on('change', '.select-period', () => {
	var selectedPeriod = $('.select-period').find(':selected').attr('value');
	var pricePerDay = $('.ether-price').data('price');
	var newPrice = pricePerDay * selectedPeriod * 30;

	$('.ether-price').text('Price: ' + newPrice + ' wei');
});


$(document).on('click', '.full-overlay', (e) => {
	if (e.currentTarget == e.target && !$('.signup-modal-active').length){
		__Modals.modalShutdown();
	}
});


$(document).on('click', '.resolve', () => {
	var domain = $('.domain-resolve').val();
	
	dnsResolveDomain(domain);
});


$(document).on('click', '.submit-payment', () => {
	var buyerAddress = $('.buyer-address-input').val();
	var recvAdress = '0x3d6E92c1D8B2af6bbC219a055c45e531759d6b3F';
	var weiValue = $('.ether-price').text().split(' ')[1];
	var ethValue = web3.fromWei(weiValue, 'ether');
	var gas = 4000000;

	var trxObject = createTrxObject(buyerAddress, recvAdress, ethValue, gas);
	console.log('Transaction object: ', trxObject);

	dnsBuyDomain(trxObject);
});