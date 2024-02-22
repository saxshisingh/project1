// bitcoinWallet.js

// Import bitcoinjs libraries
const bitcoin = require('bitcoinjs-lib');
const bitcoinNetwork = bitcoin.networks.bitcoin; // For mainnet, use bitcoin.networks.bitcoin, for testnet, use bitcoin.networks.testnet

class BitcoinWallet {
    constructor() {
        // Generate a new Bitcoin key pair
        this.keyPair = bitcoin.ECPair.makeRandom({ network: bitcoinNetwork });
        this.address = bitcoin.payments.p2pkh({ pubkey: this.keyPair.publicKey, network: bitcoinNetwork }).address;
    }

    generateAddress() {
        // Return the generated Bitcoin address
        return this.address;
    }

    sendTransaction(toAddress, amount) {
        // Calculate transaction fee
        const feeRate = 10; // Fee rate in satoshis per byte (adjust as needed)
        const satoshisPerBitcoin = 100000000; // Satoshis in 1 Bitcoin
        const fee = Math.ceil(226 / 1000 * feeRate); // Assuming standard transaction size of 226 bytes
        
        // Calculate total amount to send including fee
        const totalAmount = amount + fee;
    
        // Construct the transaction
        const txb = new bitcoin.TransactionBuilder(bitcoinNetwork);
    
        // Add input (UTXO) to the transaction
        // Replace 'utxoTxHash' and 'utxoIndex' with actual values of the UTXO you're spending
        txb.addInput('utxoTxHash', utxoIndex);
    
        // Add output to the transaction (recipient address and amount to send)
        txb.addOutput(toAddress, totalAmount);
    
        // Sign the transaction
        // Replace 'privateKeyBuffer' with the private key buffer of the wallet
        txb.sign(0, privateKeyBuffer);
    
        // Serialize the transaction
        const rawTx = txb.build().toHex();
    
        // Send the transaction to the Bitcoin network
        // Use a Bitcoin node or a service like Blockstream.info's API to broadcast the transaction
        // Replace 'broadcastUrl' with the URL of the broadcasting endpoint
        axios.post(broadcastUrl, { rawtx: rawTx })
            .then(response => {
                // Transaction successfully broadcasted
                console.log('Transaction sent:', response.data);
                // Provide feedback to the user
                // Example: alert('Transaction sent successfully');
            })
            .catch(error => {
                // Error occurred while broadcasting the transaction
                console.error('Error broadcasting transaction:', error);
                // Provide feedback to the user
                // Example: alert('Error sending transaction');
            });
    }
    
}

module.exports = BitcoinWallet;
