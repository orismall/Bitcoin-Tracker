const BitcoinData = require('../models/BitcoinData');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function fetchAndStorePrice() {
  try {
    const res = await fetch("https://api.api-ninjas.com/v1/bitcoin", {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY
      }
    });

    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    const data = await res.json();
    const price = parseFloat(data.price);

    
    // Fetch current data
    const allPrices = await BitcoinData.find({});
    const values = allPrices.map(p => p.value);
    // Include the new price BEFORE computing stats
    const fullValues = [...values, price];
    const max = Math.max(...fullValues);
    const min = Math.min(...fullValues);
    const avg = fullValues.reduce((a, b) => a + b, 0) / fullValues.length;
    const recommendation = price < avg ? "BUY" : "SELL";

    // Save to DB
    await BitcoinData.create({ value: price , average: avg});

    console.log(`[${new Date().toLocaleTimeString('en-IL', { timeZone: 'Asia/Jerusalem' })}]`);
    console.log(`Bitcoin Current Value: $${price}`);
    console.log(`Minimum Value: $${min.toFixed(2)}, Maximum Value: $${max.toFixed(2)}, Average Value: $${avg.toFixed(2)}`);
    console.log(`Recommendation: ${recommendation}`);
    console.log('---------------------------');

  } catch (err) {
    console.error("Fetch/store error:", err.message);
  }
}

module.exports = fetchAndStorePrice;