var EthereumDNS = artifacts.require('./EthereumDNS.sol');

module.exports = function(deployer) {
	deployer.deploy(EthereumDNS);
}