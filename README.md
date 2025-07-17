# 🪙 Bitcoin Tracker

A Node.js script that tracks the current Bitcoin price every minute using a REST API, calculates the **average**, **minimum**, and **maximum** values since the script started, and stores each reading in **MongoDB**. Based on the latest value, it prints a **buy/sell recommendation** to the console.

## 📋 Assignment Objectives

- Fetch the **current Bitcoin value** every minute
- Calculate **min**, **max**, and **average** since the start of the script
- Write the results to a **MongoDB database**
- Print an **output** every minute with the above statistics and a **buy/sell recommendation**
- Run the project in **Docker containers**

---

## 📁 Assignment Structure 
The assignment was designed with **MVC** structure, for cleaner code, easy debugging and clear separation of responsibilites.

- bitcoin-tracker
    - controllers
        - bitcoinController.js 
    - services
        - bitcoinService.js
    - models
        - BitcoinData.js
    - BitcoinTracker.js
    - .env
    - .gitignore
    - .dockerignore
    - Dockerfile
    - docker-compose.yml
    - mongod.conf
    - package.json
    - package-lock.json
    - README.md
  
---

## 🚀 Run with Docker Compose

    Navigate to the directory and run with: docker-compose up --build

---

## Author
- Ori Small

---