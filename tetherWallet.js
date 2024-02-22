// tetherWallet.js

// Import Ethereum libraries
const ethers = require('ethers');

// Tether contract address on Ethereum mainnet
const tetherContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

class TetherWallet {
    constructor() {
        // Initialize Ethereum provider
        this.provider = new ethers.providers.InfuraProvider('mainnet', 'YOUR_INFURA_API_KEY');
        
        // Load Tether contract ABI
        const tetherContractABI = [
            // ERC-20 standard functions
            'function balanceOf(address owner) external view returns (uint256)',
            'function transfer(address to, uint256 amount) external returns (bool)',
            // Add other ERC-20 functions as needed
        ];
        
        // Initialize Tether contract instance
        this.tetherContract = new ethers.Contract(tetherContractAddress, tetherContractABI, this.provider);

        // Create wallet instance
        this.wallet = ethers.Wallet.createRandom();
    }

    async generateAddress() {
        // Return the generated Ethereum address
        return this.wallet.address;
    }

    async getTetherBalance() {
        // Retrieve Tether balance for the wallet address
        const balance = await this.tetherContract.balanceOf(this.wallet.address);
        return balance;
    }

    async sendTether(toAddress, amount) {
        // Send Tether to the specified address
        const tx = await this.tetherContract.transfer(toAddress, amount);
        await tx.wait();
        console.log('Tether transaction hash:', tx.hash);
    }
}

module.exports = TetherWallet;
