pragma solidity ^0.4.0;
contract EthereumDNS{
    // Define struct for reserving domain
    struct DNSRecord {
        // Ethereum address for owner of the domain
        address owner_addr;
        // IP address attached to domain
        string ip_addr;
        // Time remaining before record is not valid
        uint end_timestamp;
    }
    
    // Define current price for a year in wei
    uint private CurrentPrice = 1;
    
    // List containing domains (string) and their owners
    mapping (string => DNSRecord) dns_records;

   
}