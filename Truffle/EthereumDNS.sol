pragma solidity ^0.4.0;
contract EthereumDNS{
    // Contract owner address
    address contract_owner;
    
    // Constructor for storing contract owner address
    function EthereumDNS() public {
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
        // true when DNSRecord exists
        bool isDefined;
    }
    
    // Define current price for a day in wei
    uint private CurrentPrice = 1;
    
    // List containing domains (string) and their owners
    mapping (string => DNSRecord) dns_records;
    
    // Resolves IP address based on domain name
    function resolveDomain(string domain) public constant returns(string) {
        var dnsRecord = dns_records[domain];
        if(dnsRecord.isDefined && dnsRecord.end_timestamp > now){
            return dnsRecord.ip_addr;
        }else{
            // address does not exists or registration time was expired
            throw;
        }
    }
    
    // Buy domain if domain name is not used
    function buyDomain(string domain, string ip_addr) public payable {
        if(dns_records[domain].isDefined && dns_records[domain].end_timestamp > now){
            // address exists and registration time was nor expired
            throw;
        }
        else{
            var end_timestamp = calculateTimeForAmount(msg.value) + now;
            dns_records[domain] = DNSRecord(msg.sender,ip_addr,end_timestamp,true);
        }
    }
    
    // Delete domain if you are an owner of the domain
    function deleteDomain(string domain) public {
        if(dns_records[domain].owner_addr == msg.sender){
            dns_records[domain].isDefined = false;
        }
        else{
            throw;
        }
    }
    
    // Update current price if you are an owner of the contract
    function updateCurrentPrice(uint newPrice) public ifOwner{
        CurrentPrice = newPrice;
    }
    
    // Get current price for a day
     function getCurrentPrice() public constant returns(uint){
        return CurrentPrice;
    }

    // Fail safe for hackers - check amount against our current price
    function calculateTimeForAmount(uint amount) private returns (uint256){
        // Calculate number of days (no decimals)
        var numberOfDays = amount / CurrentPrice;
        // Return number of seconds 
        return numberOfDays * 86400;
  }
  
  // Modifier for determening wether function caller is contract owner
   modifier ifOwner(){
        if(msg.sender == contract_owner){
            _;
        }else{
            throw;
        }
    }
}
    