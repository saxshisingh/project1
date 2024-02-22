// parentWallet.js

class ParentWallet {
    constructor() {
        this.childWallets = {};
    }

    addChildWallet(walletName, walletInstance) {
        // Add a child wallet to the parent wallet
        this.childWallets[walletName] = walletInstance;
    }

    getChildWallet(walletName) {
        // Retrieve a child wallet by name
        return this.childWallets[walletName];
    }
}

module.exports = ParentWallet;
