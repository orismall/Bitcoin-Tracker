require('dotenv').config();
const mongoose = require('mongoose');
const bitcoinController = require('./controllers/bitcoinController.js');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    let isRunning = false;
    // Run once immediately
    bitcoinController.trackBitcoin();
    // Set interval to run every 60 seconds
    setInterval(async () => {
      if (isRunning) return; // guard: skip if previous is still running
      isRunning = true;
      try {
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
