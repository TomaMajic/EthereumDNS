pragma solidity ^0.4.0;
contract EthereumDNS{
    // Contract owner address
    address contract_owner;
    
    // Constructor for storing contract owner address
    function EthereumDNS(){
        contract_owner = msg.sender;
    }
    
    // Define struct for reserving domain
    struct DNSRecord {
        // Ethereum address for owner of the domain
        address owner_addr;
        // IP address attached to domain
        string ip_addr;
        // Time remaining before record is not valid
        uint256 end_timestamp;
    }
    
    // Define current price for a day in wei
    uint private CurrentPrice = 1;
    
    // List containing domains (string) and their owners
    mapping (string => DNSRecord) dns_records;
    
    function updateCurrentPrice(uint newPrice) ifClient{
        CurrentPrice = newPrice;
    }
    
    // Fail safe for hackers - check amount against our current price
    function calculateTimeForAmount(uint amount) private returns (uint256){
        // Calculate number of days (no decimals)
        var numberOfDays = amount / CurrentPrice;
        // Return number of seconds 
        return numberOfDays * 86400;
  }
  
  // Modifier for determening wether function caller is contract owner
   modifier ifClient(){
        if(msg.sender == contract_owner){
            _;
        }else{
            throw;
        }
    }
}