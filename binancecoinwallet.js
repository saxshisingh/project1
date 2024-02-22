// binanceCoinWallet.js

// Import Binance Smart Chain JavaScript SDK
const { BncClient } = require('@binance-chain/javascript-sdk');

// Binance Coin contract address on Binance Smart Chain
const bnbContractAddress = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';

class BinanceCoinWallet {
    constructor() {
        // Initialize Binance Smart Chain client
        this.client = new BncClient('https://bsc-dataseed.binance.org/');
        // Initialize wallet from private key or mnemonic
        this.wallet = this.client.recoverAccountFromPrivateKey('PRIVATE_KEY');
        
        // Load Binance Coin contract ABI
        const bnbContractABI = [
            // BEP-20 standard functions
            'function balanceOf(address owner) external view returns (uint256)',
            'function transfer(address to, uint256 amount) external returns (bool)',
            // Add other BEP-20 functions as needed
        ];
        
        // Initialize Binance Coin contract instance
        this.bnbContract = this.client.getContract(bnbContractAddress, bnbContractABI);
    }

    async generateAddress() {
        // Return the generated Binance Coin address
        return this.wallet.address;
    }

    async getBNBBalance() {
        // Retrieve Binance Coin balance for the wallet address
        const balance = await this.bnbContract.balanceOf(this.wallet.address);
        return balance;
    }

    async sendBNB(toAddress, amount) {
        // Send Binance Coin to the specified address
        const tx = await this.bnbContract.transfer(toAddress, amount);
        console.log('Binance Coin transaction hash:', tx.hash);
    }
}

module.exports = BinanceCoinWallet;
