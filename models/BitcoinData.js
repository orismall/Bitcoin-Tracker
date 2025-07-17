const mongoose = require('mongoose');

const BitcoinDataSchema = new mongoose.Schema({
  value: Number,
  average: Number,
  timestamp: {
    type: Date,
    default: () => new Date(Date.now() + 3 * 60 * 60 * 1000) // UTC+3
  }
}, { collection: 'bitcoin data' });

module.exports = mongoose.model('BitcoinData', BitcoinDataSchema);
