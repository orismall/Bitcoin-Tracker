BitcoinTracker:
require('dotenv').config();
const mongoose = require('mongoose');
const bitcoinController = require('./controllers/bitcoinController.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    runTracker();
  })
  .catch(err => console.error("MongoDB connection error:", err));

  function runTracker() {
    bitcoinController.trackBitcoin().finally(() => {
      setTimeout(runTracker, 60 * 1000);
    });
}