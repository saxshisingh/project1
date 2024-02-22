// ethereumWallet.js

// Import ethereum libraries
const ethers = require('ethers');

class EthereumWallet {
    constructor() {
        // Generate a new Ethereum wallet
        this.wallet = ethers.Wallet.createRandom();
        this.provider = new ethers.providers.InfuraProvider('rinkeby', 'YOUR_INFURA_API_KEY');
    }

    generateAddress() {
        // Return the generated Ethereum address
        return this.wallet.address;
    }

    async sendTransaction(toAddress, amount) {
        // Construct and sign an Ethereum transaction
        const transaction = {
            to: toAddress,
            value: ethers.utils.parseEther(amount.toString()),
        };
        const signedTransaction = await this.wallet.signTransaction(transaction);
        
        // Send the transaction to the Ethereum network
        const txResponse = await this.provider.sendTransaction(signedTransaction);
        
        // Wait for transaction confirmation
        await txResponse.wait();
        
        // Provide feedback to the user
        console.log('Transaction sent:', txResponse.hash);
    }
}

module.exports = EthereumWallet;
