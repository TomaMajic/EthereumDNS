// var Test = artifacts.require('./Test.sol');
var EthereumDNS = artifacts.require('./EthereumDNS.sol');

module.exports = function(deployer) {
	// deployer.deploy(Test, 10);
	deployer.deploy(EthereumDNS);
}