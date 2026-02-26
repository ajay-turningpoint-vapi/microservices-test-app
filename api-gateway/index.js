const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

app.use(express.json());

// Routing
app.use('/auth', proxy('http://user-service:3001')); // Docker service name
app.use('/orders', proxy('http://order-service:3002'));

app.listen(3000, () => {
    console.log('Surver UP!!!!, API Gateway running on port 3000');
});