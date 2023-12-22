FROM node:lts-alpine

# Create and set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port on which our api server runs
EXPOSE 3000

# Command to start dev server
CMD ["npm", "run", "start:dev"]
