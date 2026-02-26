FROM node:18-alpine

WORKDIR /app

# 1. Copy package files from the gateway subdirectory
COPY api-gateway/package*.json ./

# 2. Install production dependencies
RUN npm install --production

# 3. Copy the Gateway source code
# (Assuming your gateway entry file is called index.js)
COPY api-gateway/index.js ./index.js

# API Gateway traditionally runs on 3000
EXPOSE 3000

CMD ["node", "index.js"]