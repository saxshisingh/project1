// tronWallet.js

// Import TronWeb library
const TronWeb = require('tronweb');

class TronWallet {
    constructor() {
        // Initialize TronWeb instance
        this.tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
            privateKey: 'YOUR_PRIVATE_KEY', // Private key or mnemonic
        });
    }

    async generateAddress() {
        // Generate a new Tron address
        const address = await this.tronWeb.address.generateAddress();
        return address.base58;
    }

    async getTRXBalance(address) {
        // Retrieve TRX balance for the specified address
        const balance = await this.tronWeb.trx.getBalance(address);
        return balance;
    }

    async sendTRX(toAddress, amount) {
        // Send TRX to the specified address
        const tx = await this.tronWeb.transactionBuilder.sendTrx(
            toAddress,
            amount,
            this.tronWeb.defaultAddress.base58
        );
        console.log('Tron transaction:', tx);
    }
}

module.exports = TronWallet;
