FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY common/rabbitmq.js ./common/rabbitmq.js
COPY order-service/index.js ./order-service/index.js

ENV NODE_ENV=production
ENV PORT=3002

EXPOSE 3002

CMD ["node", "order-service/index.js"]