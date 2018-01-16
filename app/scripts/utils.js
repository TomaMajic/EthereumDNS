function switchToHomeTab() {
	$('.jumbotron').empty();
	$('.buy-tab').parent().removeClass('active');
	$('.home-tab').parent().addClass('active');

	var html = '<input type="text" name="url-input" class="url-input" placeholder="Unesite vašu domenu">'
				+ '<a class="btn btn-lg btn-success" href="#">Razluči</a>';

    $('.jumbotron').append(html);
}


function switchToBuyTab() {
	$('.jumbotron').empty();
	$('.home-tab').parent().removeClass('active');
	$('.buy-tab').parent().addClass('active');

	var html = '<input type="text" name="url-input" class="url-input" placeholder="Unesite željenu domenu">'
				+ '<a class="btn btn-lg btn-success buy-btn" href="#">Kupi</a>';

    $('.jumbotron').append(html);
}


function getBuyModalHtml() {
	var title = $('.url-input').val();
	var html;

	// if title contains spaces stop executing method return some 'We're sorry' string
	if(!checkDomain(title)) {
		var img_src = './images/error.png';

		html = '<h1>Pogreška</h1>'
				+ '<p>Nedozvoljeno ime domene ili domena nedostupna!</p>'
				+ '<div class="error-img"><img src=' + img_src + ' height="175" width="175"></div>';
	} else {
		html = '<h1 class="domain-modal-title">' + title + '</h1>' 
					+ '<input type="text" name="ip-input" class="ip-input url-input" placeholder="IP adresa">'
					+ '<input type="text" name="buyer-address-input" class="buyer-address-input url-input" placeholder="Unesite svoju javnu adresu">'
					+ '<div class="time-period">Choose period:   ' 
							+ '<select>' 
								+ '<option value="3">3 months</option>'
								+ '<option value="6">6 months</option>'
								+ '<option value="12">12 months</option>'
							+ '</select>'
						+ '</div>'
					+ '<div class="ether-price">Price: 100 Eth</div>'
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

function createTrxObject(from, to, value) {
	var trxObject = {};

	trxObject.from = from;
	trxObject.to = to;

	var valueInWei = web3.toWei(value, 'ether');
	trxObject.value = valueInWei;

	return trxObject;
}

function createContract(abi, contractAddress) {
	var abiDefinition = JSON.parse(abi);
	var contract = web3.eth.contract(abiDefinition);
	var myContract = contract.at(contractAddress);

	return myContract;
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