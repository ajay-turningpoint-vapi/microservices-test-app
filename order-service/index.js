const express = require('express');
const mongoose = require('mongoose');
const rabbitmq = require('../common/rabbitmq');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Order-DB Connected'))
  .catch(err => console.error('Mongo Connection Error:', err));

// Schema & Model
const OrderSchema = new mongoose.Schema({ userId: String, product: String, price: Number });
const Order = mongoose.model('Order', OrderSchema);

// Connect to RabbitMQ
rabbitmq.connect();

// Routes
app.post('/', async (req, res) => {
    const { userId, product, price } = req.body;
    
    try {
        // 1. Create and Save Order
        const newOrder = new Order({ userId, product, price });
        await newOrder.save();

        // 2. Publish to RabbitMQ
        // We use 'await' here to ensure the message is sent before responding
        await rabbitmq.publish('order_created', newOrder);

        res.status(201).send({ 
            message: 'Order placed and queued!', 
            newOrder 
        });
    } catch (err) {
        console.error('Order creation/queue failed:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3002, () => {
    console.log('Order Service running on port 3002');
});