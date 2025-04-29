# Use node version 22 (cache)
FROM node:23-alpine

# Set the working directory (app) (cache)
WORKDIR /app

# Copy the dependencies (libs) (cache)
COPY package*.json ./

# Install the libs (cache)
RUN npm install

# Copy the rest of application files from localhost into the container
COPY . .
# Expose port
EXPOSE 3001

# Command to start up
CMD ["npm", "start"]
