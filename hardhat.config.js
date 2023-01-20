require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");
const { NomicLabsHardhatPluginError } = require("hardhat/plugins");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.REACT_APP_GOERLI_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
  }
};
