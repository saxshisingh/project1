// index.js

const ParentWallet = require('./parentWallet');
const BitcoinWallet = require('./bitcoinWallet');
const EthereumWallet = require('./ethereumWallet');

// Create parent wallet instance
const parentWallet = new ParentWallet();

// Add child wallets for different cryptocurrencies
const bitcoinWallet = new BitcoinWallet();
const ethereumWallet = new EthereumWallet();

parentWallet.addChildWallet('BTC', bitcoinWallet);
parentWallet.addChildWallet('ETH', ethereumWallet);

// Example usage
const btcWallet = parentWallet.getChildWallet('BTC');
const ethWallet = parentWallet.getChildWallet('ETH');

console.log('BTC Address:', btcWallet.generateAddress());
console.log('ETH Address:', ethWallet.generateAddress());
