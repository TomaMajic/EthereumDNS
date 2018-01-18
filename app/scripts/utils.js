function switchToHomeTab() {
	$('.jumbotron').empty();
	$('.buy-tab').parent().removeClass('active');
	$('.home-tab').parent().addClass('active');

	var html = '<input type="text" name="url-input" class="url-input domain-resolve" placeholder="Unesite vašu domenu">'
				+ '<a class="btn btn-lg btn-success resolve" href="#">Razluči</a>';

    $('.jumbotron').append(html);
}


function switchToBuyTab() {
	$('.jumbotron').empty();
	$('.home-tab').parent().removeClass('active');
	$('.buy-tab').parent().addClass('active');

	var html = '<input type="text" name="url-input" class="url-input domain" placeholder="Unesite željenu domenu">'
				+ '<a class="btn btn-lg btn-success buy-btn" href="#">Kupi</a>';

    $('.jumbotron').append(html);
}


function getBuyModalHtml(priceInWei) {
	var title = $('.url-input').val();
	var defaultPrice = 90*priceInWei;
	var html;

	if(!checkDomain(title)) {
		var imgSrc = './images/error.png';

		html = '<h1>Pogreška</h1>'
				+ '<p>Nedozvoljeno ime domene ili domena nedostupna!</p>'
				+ '<div class="error-img"><img src=' + imgSrc + ' height="175" width="175"></div>';
	} else {
		html = '<h1 class="domain-modal-title">' + title + '</h1>' 
					+ '<input type="text" name="ip-input" class="ip-input url-input" placeholder="IP adresa">'
					+ '<input type="text" name="buyer-address-input" class="buyer-address-input url-input" placeholder="Unesite svoju javnu adresu">'
					+ '<div class="time-period">Choose period:   ' 
							+ '<select class="select-period">' 
								+ '<option value="3">3 months</option>'
								+ '<option value="6">6 months</option>'
								+ '<option value="12">12 months</option>'
							+ '</select>'
						+ '</div>'
					+ '<div class="ether-price" data-price="' + priceInWei + '">Price: ' + defaultPrice + ' wei</div>'
					+ '<button class="submit-payment btn btn-lg btn-success">Plati</button>';

	}

	return html;
}


function checkDomain(domain_name) {
	// Jel triba gledat ima li tocku? Ili dodajemo automatski .eth?
	if((domain_name == '') || (/\s/.test(domain_name))) {
		return false;
	// } else if(available) {return false}

	}

	return true;
}


function createTrxObject(from, to, value, gas) {
	var trxObject = {};

	trxObject.from = from;
	trxObject.to = to;

	var valueInWei = web3.toWei(value, 'ether');
	trxObject.value = valueInWei;
	trxObject.gas = gas;

	return trxObject;
}


function createContract(abi, contractAddress) {
	var abiDefinition = JSON.parse(abi);
	var contract = web3.eth.contract(abiDefinition);
	var myContract = contract.at(contractAddress);

	return myContract;
}

// Prominit ne radi kako triba
function dnsBuyDomain(trxObject) {
	var contractAbi = '[{"constant": false,"inputs": [{"name": "domain","type": "string"}],"name": "deleteDomain","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "domain","type": "string"}],"name": "resolveDomain","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "domain","type": "string"},{"name": "ip_addr","type": "string"}],"name": "buyDomain","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "newPrice","type": "uint256"}],"name": "updateCurrentPrice","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getCurrentPrice","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}]';
    var contractAddress = '0x8Ef749513F863B4C1760fBEDB4dCE7e61D82B9a9';
    var dnsContract = createContract(contractAbi, contractAddress);

    var domain = $('.domain').val();
    var ipAddr = $('.ip-input').val();
    console.log(domain + ' ' + ipAddr);
    dnsContract.buyDomain.sendTransaction(domain, ipAddr, trxObject, (err, res) => {
    	if(err) {
    		console.log('Error: ', err);
    	} else {
    		console.log(res);

    		var imgSrc = './images/success.png'
    		var html = '<img src=' + imgSrc + ' height="175" width="175"></div>'
    					+ '<p>Uspješno izvršena transakcija</p>';

    		$('.modal').fadeIn(200).empty();
    		$('.modal').fadeIn(200).append(html);
    	}
    });
}


function dnsResolveDomain(domain) {
	var contractAbi = '[{"constant": false,"inputs": [{"name": "domain","type": "string"}],"name": "deleteDomain","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "domain","type": "string"}],"name": "resolveDomain","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "domain","type": "string"},{"name": "ip_addr","type": "string"}],"name": "buyDomain","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "newPrice","type": "uint256"}],"name": "updateCurrentPrice","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getCurrentPrice","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}]';
    var contractAddress = '0x8Ef749513F863B4C1760fBEDB4dCE7e61D82B9a9';
    var dnsContract = createContract(contractAbi, contractAddress);

    // var trxObject = {
    // 	from: web3.eth.coinbase,
    // 	gas: 4000000
    // }

    dnsContract.resolveDomain.call(domain, (err, res) => {
    	if(err) {
    		console.log('Error: ', err);
    	} else {
    		console.log(res);
    	}
    });
}


var __Modals = {
	openModal: function() {
		//open fulloverlay
		$('.full-overlay').fadeIn(200);
		$('body').addClass('modal-open');
	},
	modalShutdown: function(argument) {
		if (argument == undefined || argument == null) {
			var $modal = $('.modal');
		}

		$modal.fadeOut(100, function () {
			$modal.empty();
			$('.full-overlay').delay(100).fadeOut(200);
			if (argument != undefined) {
				$('.non-disposable').delay(100).fadeOut(200);
			}

			$modal.removeClass(function(index, _class) { 
			  return _class.replace(/(^|\s)+modal\s+/, ''); 
			});

			$modal.addClass('modal');
		});

		$('body').removeClass('modal-open');
	}
}