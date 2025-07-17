BitcoinTracker:
require('dotenv').config();
const mongoose = require('mongoose');
const fetchAndStorePrice = require('./services/BitcoinFetcher');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    runTracker();
  })
  .catch(err => console.error("MongoDB connection error:", err));
  function runTracker() {
    fetchAndStorePrice().finally(() => {
      setTimeout(runTracker, 60 * 1000); 
    });
}