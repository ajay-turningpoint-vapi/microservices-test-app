const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); // To talk to User Service
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Order-DB Connected'));

const OrderSchema = new mongoose.Schema({ userId: String, product: String, price: Number });
const Order = mongoose.model('Order', OrderSchema);

app.post('/', async (req, res) => {
    // Basic Inter-service communication
    // In production, we validate the User exists by calling User Service
    const { userId, product, price } = req.body;
    
    // Logic: Create Order
    const newOrder = new Order({ userId, product, price });
    await newOrder.save();
    res.json(newOrder);
});

app.listen(3002, () => {
    console.log('Order Service running on port 3002');
});