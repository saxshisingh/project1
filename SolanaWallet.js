// solanaWallet.js

// Import Solana web3 library
const { Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');

class SolanaWallet {
    constructor() {
        // Initialize connection to Solana cluster
        this.connection = new Connection('https://api.mainnet-beta.solana.com');
        // Generate a new Solana keypair
        this.keypair = Keypair.generate();
    }

    async generateAddress() {
        // Return the generated Solana address
        return this.keypair.publicKey.toBase58();
    }

    async getSOLBalance(address) {
        // Retrieve SOL balance for the specified address
        const balance = await this.connection.getBalance(address);
        return balance;
    }

    async sendSOL(toAddress, amount) {
        // Construct and send SOL transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: this.keypair.publicKey,
                toPubkey: toAddress,
                lamports: amount * 1000000000, // Convert SOL to lamports (1 SOL = 1e9 lamports)
            })
        );
        const signature = await sendAndConfirmTransaction(this.connection, transaction, [this.keypair]);
        console.log('Solana transaction:', signature);
    }
}

module.exports = SolanaWallet;
