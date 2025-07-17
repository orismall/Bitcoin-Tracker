const BitcoinData = require('../models/BitcoinData');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Fetches the current Bitcoin value, calculates min, max, avg,
 * stores the data in MongoDB, and prints a buy/sell recommendation.
 */
async function fetchAndStore() {

  // Fetchs current Bitcoin value from API
  const res = await fetch("https://api.api-ninjas.com/v1/bitcoin", {
    headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } // Authorization key stored in .env API_NINJAS_KEY
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  // Parses the response
  const data = await res.json();
  const price = parseFloat(data.price);

  // Fetches all previous data from DB
  const allPrices = await BitcoinData.find({});
  const values = allPrices.map(p => p.value);

  // Calculates min/max/avg according to previous and current data
  const fullValues = [...values, price];
  const max = Math.max(...fullValues);
  const min = Math.min(...fullValues);
  const avg = fullValues.reduce((a, b) => a + b, 0) / fullValues.length;

  // Gives recommendation based on current value vs average value 
  const recommendation = price < avg ? "BUY" : "SELL";

  // Saves current data in DB
  await BitcoinData.create({ value: price, average: avg });

  // Prints output of current execution with updated data
  console.log(`[${new Date().toLocaleTimeString('en-IL', { timeZone: 'Asia/Jerusalem' })}]`);
  console.log(`Bitcoin Current Value: $${price}`);
  console.log(`Minimum: $${min.toFixed(2)}, Maximum: $${max.toFixed(2)}, Average: $${avg.toFixed(2)}`);
  console.log(`Recommendation: ${recommendation}`);
  console.log('---------------------------');
}

module.exports = { fetchAndStore };
