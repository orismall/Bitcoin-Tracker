# 🪙 Bitcoin Tracker

A Node.js script that tracks the current Bitcoin price every minute using a REST API, calculates the **average**, **minimum**, and **maximum** values since the script started, and stores each reading in **MongoDB**. Based on the latest value, it prints a **buy/sell recommendation** to the console.

## 📋 Assignment Objectives

- Fetch the **current Bitcoin value** every minute
- Calculate **min**, **max**, and **average** since the start of the script
- Write the results to a **MongoDB database**
- Print an **output** every minute with the above statistics and a **buy/sell recommendation**
- Run the project in **Docker containers**

---

## 📁 Project Structure (MVC)

bitcoin-tracker/
├── controllers/
│ └── bitcoinController.js # Handles request logic
├── services/
│ └── bitcoinService.js # Handles logic: fetch, calculate, save
├── models/
│ └── BitcoinData.js # MongoDB schema
├── .env # Environment variables
├── Dockerfile # Node.js container definition
├── docker-compose.yml # Multi-container setup (app + mongo)
├── BitcoinTracker.js # Entry point
└── mongod.conf # MongoDB config file

---

🚀 Run with Docker Compose

docker-compose up --build
