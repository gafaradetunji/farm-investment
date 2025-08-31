import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();


const {LISK_RPC_URL, PRIVATE_KEY} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
   'lisk-sepolia-testnet': {
     url: LISK_RPC_URL,
     accounts:[`0x${PRIVATE_KEY}`]
   },
 },
 etherscan: {
   apiKey: {
     'lisk-sepolia-testnet': 'empty'
   },
   customChains: [
     {
       network: "lisk-sepolia-testnet",
       chainId: 4202,
       urls: {
         apiURL: "https://sepolia-blockscout.lisk.com/api",
         browserURL: "https://sepolia-blockscout.lisk.com"
       }
     }
   ]
 }
 


};


export default config;
