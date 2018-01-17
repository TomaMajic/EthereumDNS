var HDWalletProvider = require('truffle-hdwallet-provider');
var infura_apikey = 'Q2Il7DVs8vOaY8xerEgT';

// Ovo triba svako prominit za sebe i stavit mnemonic od svog metamaska
var mnemonic = 'party weird draw glad bulk bottom skull odor sock chimney bless glue';

module.exports = {
	networks: {
		development: {
		   host: "localhost",
		   port: 8545,
		   network_id: "*" // Match any network id
		},

		ropsten: {
		   provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/'+infura_apikey),
		   network_id: 3,
		   gas: 4600000
		}
	}
};