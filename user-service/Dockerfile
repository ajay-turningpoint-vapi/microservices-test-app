# Use Node.js LTS
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the common rabbitmq wrapper into the container
# Note: We assume you run the docker build from the root folder
COPY common/rabbitmq.js ./common/rabbitmq.js

# Copy the service code
COPY user-service/index.js ./user-service/index.js

# Set environment variables (Defaults)
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Start the app
CMD ["node", "user-service/index.js"]