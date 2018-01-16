pragma solidity ^0.4.4;

contract Test {
	uint num;

	function Test(uint initial) {
		num = initial;
	}

	function getNum() returns (uint) {
		return num;
	}
}
