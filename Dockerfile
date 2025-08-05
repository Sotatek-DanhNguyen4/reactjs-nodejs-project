# Use node version 22 (cache)
FROM node:18-bullseye

# Set the working directory (app) (cache)
WORKDIR /app

# Copy the dependencies (libs) (cache)
COPY ./backend/package*.json ./

# Install the libs (cache)
RUN npm install

# Copy the rest of application files from localhost into the container
COPY ./backend .
# Expose port
EXPOSE 3001

# Command to start up
CMD ["npm", "start"]
