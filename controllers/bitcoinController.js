const bitcoinService = require('../services/bitcoinService');

/**
 * Creates the connection between the main script layer to the service layer.
 */
async function trackBitcoin() {
  try {
    
    // Calls bitcoinService for handling data fetch, processing, and storage
    await bitcoinService.fetchAndStore();
  } catch (err) {
    console.error("Controller error:", err.message);
  }
}

module.exports = { trackBitcoin };
