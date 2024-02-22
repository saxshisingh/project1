// chainlinkIntegration.js

// Import Axios for HTTP requests
const axios = require('axios');

class ChainlinkIntegration {
    constructor() {
        // Define Chainlink API URL
        this.apiURL = 'https://chain.link/v1/pricefeed';

        // Define Chainlink pairs
        this.pairs = ['ETH/USD', 'BTC/USD', 'LINK/USD']; // Example pairs
    }

    async getPrice(pair) {
        try {
            // Make HTTP GET request to Chainlink API
            const response = await axios.get(`${this.apiURL}/${pair}`);
            // Extract price data from response
            const price = response.data.price;
            return price;
        } catch (error) {
            console.error('Error fetching price:', error);
            return null;
        }
    }

    async getAllPrices() {
        const prices = {};
        for (const pair of this.pairs) {
            const price = await this.getPrice(pair);
            prices[pair] = price;
        }
        return prices;
    }
}

module.exports = ChainlinkIntegration;
