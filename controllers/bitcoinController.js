const bitcoinService = require('../services/bitcoinService');

async function trackBitcoin() {
  try {
    await bitcoinService.fetchAndStore();
  } catch (err) {
    console.error("Controller error:", err.message);
  }
}

module.exports = { trackBitcoin };
