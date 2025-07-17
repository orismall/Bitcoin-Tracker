FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies according to package.json
RUN npm install

# Copy all project source files inside the container
COPY . .

# Run the node.js script
CMD ["node", "BitcoinTracker.js"]