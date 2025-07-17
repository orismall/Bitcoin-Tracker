require('dotenv').config();
const mongoose = require('mongoose');
const bitcoinController = require('./controllers/bitcoinController.js');

// Connect to MongoDB using connection string stored in .env MONGO_URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    let isRunning = false;

    // First run on startup
    bitcoinController.trackBitcoin();

    // Set interval to run every minute
    setInterval(async () => {

      // Check for overlapping executions
      if (isRunning) return;
      isRunning = true;
      try {
        
        // Call bitcoinController trackBitcoin function for the next run
        await bitcoinController.trackBitcoin();
      } catch (err) {
        console.error("Tracking error:", err.message);
      } finally {
        isRunning = false;
      }
    }, 60 * 1000);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });
