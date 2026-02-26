FROM node:18-alpine

WORKDIR /app

# Copy package files from the service subdirectory
COPY order-service/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the shared rabbitmq logic from the common folder
COPY common/ ./common/

# Copy the service-specific index.js
COPY order-service/index.js ./index.js

# Order Service Port
EXPOSE 3002

CMD ["node", "index.js"]