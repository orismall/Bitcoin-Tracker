const mongoose = require('mongoose');

const BitcoinDataSchema = new mongoose.Schema({
  value: Number,
  average: Number,
  timestamp: {
    type: Date,
    default: () => {
      const now = new Date();
      // Adds 3 more hours for Israel local time
      const utc3 = new Date(now.getTime() + 3 * 60 * 60 * 1000); 
      return utc3;
    }
  }
});

module.exports = mongoose.model('BitcoinData', BitcoinDataSchema);