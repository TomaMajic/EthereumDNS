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
	// if title contains spaces stop executing method return some 'We're sorry' string

	var html = '<h1 class="domain-modal-title">' + title + '</h1>' 
				+ '<input type="text" name="ip-input" class="ip-input url-input" placeholder="IP adresa">'
				+ '<input type="text" name="buyer-address-input" class="buyer-address-input url-input" placeholder="Unesite svoju javnu adresu">'
				+ '<div class="ether-price">Price: 100 Eth</div>'
				+ '<button class="submit-payment btn btn-lg btn-success">Plati</button>';

	return html;
}


function createTrxObject(from, to, value) {
	var trxObject = {};

	trxObject.from = from;
	trxObject.to = to;

	var valueInWei = web3.toWei(value, 'ether');
	trxObject.value = valueInWei;

	return trxObject;
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