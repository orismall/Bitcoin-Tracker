const BitcoinData = require('../models/BitcoinData');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function fetchAndStore() {
  const res = await fetch("https://api.api-ninjas.com/v1/bitcoin", {
    headers: { 'X-Api-Key': process.env.API_NINJAS_KEY }
  });

  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const data = await res.json();
  const price = parseFloat(data.price);

  const allPrices = await BitcoinData.find({});
  const values = allPrices.map(p => p.value);
  const fullValues = [...values, price];
  const max = Math.max(...fullValues);
  const min = Math.min(...fullValues);
  const avg = fullValues.reduce((a, b) => a + b, 0) / fullValues.length;
  const recommendation = price < avg ? "BUY" : "SELL";

  await BitcoinData.create({ value: price, average: avg });

  console.log(`[${new Date().toLocaleTimeString('en-IL', { timeZone: 'Asia/Jerusalem' })}]`);
  console.log(`Bitcoin Current Value: $${price}`);
  console.log(`Minimum: $${min.toFixed(2)}, Maximum: $${max.toFixed(2)}, Average: $${avg.toFixed(2)}`);
  console.log(`Recommendation: ${recommendation}`);
  console.log('---------------------------');
}

module.exports = { fetchAndStore };
