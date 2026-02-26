FROM node:18-alpine

WORKDIR /app

# 1. We copy the package.json from the specific service folder
COPY user-service/package*.json ./

RUN npm install --production

# 2. We copy the SHARED logic from the root's common folder
# This is why the old "COPY . ." was failing
COPY common/ ./common/

# 3. We copy the service-specific code
COPY user-service/index.js ./index.js

# For User Service use 3001
EXPOSE 3001 

CMD ["node", "index.js"]