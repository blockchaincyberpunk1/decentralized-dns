const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DecentralizedDNS", function () {
  let DecentralizedDNS;
  let dnsContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    DecentralizedDNS = await ethers.getContractFactory("DecentralizedDNS");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new contract before each test
    dnsContract = await DecentralizedDNS.deploy();
    await dnsContract.deployed();
  });

  describe("Domain Registration", function () {
    it("Should register a domain and emit DomainRegistered", async function () {
      const registerTx = await dnsContract.register("example.com", addr1.address);

      // wait until the transaction is mined
      await expect(registerTx).to.emit(dnsContract, 'DomainRegistered').withArgs("example.com", owner.address);
    });

    it("Should not allow registering an already registered domain", async function () {
      await dnsContract.register("example.com", addr1.address);
      await expect(dnsContract.register("example.com", addr2.address)).to.be.revertedWith("Domain already registered");
    });
  });

  describe("Domain Updating", function () {
    it("Should allow the owner to update the domain", async function () {
      await dnsContract.register("example.com", addr1.address);
      await expect(dnsContract.updateDomain("example.com", addr2.address)).to.emit(dnsContract, 'DomainUpdated').withArgs("example.com", addr2.address);
    });

    it("Should not allow non-owners to update the domain", async function () {
      await dnsContract.register("example.com", addr1.address);
      await expect(dnsContract.connect(addr2).updateDomain("example.com", addr2.address)).to.be.revertedWith("Not the domain owner");
    });
  });

  describe("Domain Resolution", function () {
    it("Should resolve to the correct address", async function () {
      await dnsContract.register("example.com", addr1.address);
      expect(await dnsContract.resolve("example.com")).to.equal(addr1.address);
    });
  });
});
