FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# For User Service use 3001, Order 3002, Gateway 3000
EXPOSE 3001 

CMD ["node", "index.js"]