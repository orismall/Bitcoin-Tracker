const mongoose = require('mongoose');

/**
 * Define a schema for Bitcoin data.
 */
const BitcoinDataSchema = new mongoose.Schema({

  // Current value of bitcoin at current time
  value: Number,

  // Average value of bitcoin from the start of the script
  average: Number,

  // Current time of execution
  timestamp: {
    type: Date,
    default: () => new Date(Date.now() + 3 * 60 * 60 * 1000) // UTC+3
  }
},

// Name of collection in MongoDB
{ collection: 'bitcoin data' });

module.exports = mongoose.model('BitcoinData', BitcoinDataSchema);
