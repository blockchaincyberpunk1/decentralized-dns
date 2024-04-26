// Import the Hardhat Waffle plugin, which enables testing Ethereum smart contracts.
require("@nomiclabs/hardhat-waffle");
// Import the 'dotenv' module, which loads environment variables from a .env file into 'process.env'.
require("dotenv").config();
require('solidity-coverage');

// Destructure the PRIVATE_KEY and INFURA_PROJECT_ID variables from the environment variables.
const { PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

// Export the Hardhat configuration object.
module.exports = {
  // Specify the version of Solidity that the project will use for compiling contracts.
  solidity: "0.8.21",
  // Define network configurations.
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    optimismGoerli: {
      url: `https://optimism-goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    arbitrumSepolia: {
      url: `https://arbitrum-sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    celoAlfajores: {
      url: `https://celo-alfajores.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    auroraTestnet: {
      url: `https://aurora-testnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    // Additional networks can be added here
  },
  // Additional configurations and plugins can be added to this object as needed.
};
