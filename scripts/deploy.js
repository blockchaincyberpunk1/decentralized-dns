const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const DecentralizedDNS = await hre.ethers.getContractFactory("DecentralizedDNS");
  const decentralizedDNS = await DecentralizedDNS.deploy();

  await decentralizedDNS.deployed();

  console.log("DecentralizedDNS deployed to:", decentralizedDNS.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
