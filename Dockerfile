# Choose a base image based on Node.js
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json file
COPY package*.json ./

# install dependencies
RUN npm install

# copy the source code
COPY . .

# Build the application
RUN npm run build
