// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DecentralizedDNS {
    // Event declarations
    event DomainRegistered(string domain, address indexed owner);
    event DomainUpdated(string domain, address indexed newAddress);

    // Mapping from domain names to their info
    struct DomainInfo {
        address owner;
        address resolver;
    }

    mapping(string => DomainInfo) public domains;

    // Modifier to check if the message sender is the domain's owner
    modifier onlyOwner(string memory domain) {
        require(msg.sender == domains[domain].owner, "Not the domain owner");
        _;
    }

    // Function to register a new domain
    function register(string memory domain, address resolver) public {
        require(domains[domain].owner == address(0), "Domain already registered");
        domains[domain] = DomainInfo(msg.sender, resolver);
        emit DomainRegistered(domain, msg.sender);
    }

    // Function to update the resolver address of a domain
    function updateDomain(string memory domain, address newResolver) public onlyOwner(domain) {
        domains[domain].resolver = newResolver;
        emit DomainUpdated(domain, newResolver);
    }

    // Function to resolve a domain to its address
    function resolve(string memory domain) public view returns (address) {
        return domains[domain].resolver;
    }
}
