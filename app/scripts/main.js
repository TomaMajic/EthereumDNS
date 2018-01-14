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
	var html = getBuyModalHtml();

	__Modals.openModal();
	$('.modal').fadeIn(200).append(html);
});

$(document).on('click', '.full-overlay', function(e) {
	if (e.currentTarget == e.target && !$('.signup-modal-active').length){
		__Modals.modalShutdown();
	}
});

$(document).on('click', '.submit-payment', () => {
	console.log('Payment triggered');
	var buyerAddress = $('buyer-address-input').val();
	var recvAdress = '0x3d6E92c1D8B2af6bbC219a055c45e531759d6b3F'; // Prominit
	var ethValue = 0.005; // Prominit

	var trxObject = createTrxObject(buyerAddress, recvAdress, ethValue);
	console.log('Transaction object: ', trxObject);
	
	web3.eth.sendTransaction(trxObject, (err, res) => {
		if(err) {
			console.log('Errorcina: ', err);
		} else { 
			var img_src = './images/success.png'
			var html = '<img src=' + img_src + ' height="175" width="175"></div>'
						+ '<p>Uspješno izvršena transakcija</p>';

			$('.modal').fadeIn(200).empty();
			$('.modal').fadeIn(200).append(html);
			// setTimeout(() => {
			// 	__Modals.modalShutdown();
			// }), 5000);
			console.log('Transaction ' + res + ' generated');
		}
	});
});