require("@nomiclabs/hardhat-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const Private_Key = "c0c86b9a8dc848a971e84a8a0af4155b0df1aa3abe8c42188d244af91a4d31df"

const Parity_Private_key = "12d97746b60fbddb8a990806f875f18e1a8d7b024c0a372813d4b46efaf76b52"

module.exports = {
  solidity: "0.8.0",
  networks: {
  	ropsten: {
  		url: `https://ropsten.infura.io/v3/e4cd759ca5a948dd82cb55b24c97e4d3`,
  		accounts: [`0x${Private_Key}`]
  	},
	bscTestnet: {
		url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
		accounts: [`0x${Private_Key}`]
	},
	parity:{
		url:"http://127.0.0.1:9933",
		accounts:[`0x${Parity_Private_key}`]
	}
  }
};