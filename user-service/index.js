const express = require('express');
const mongoose = require('mongoose');
const rabbitmq = require('../common/rabbitmq');
require('dotenv').config();

const app = express();
app.use(express.json());

// Schema & Model
const UserSchema = new mongoose.Schema({ 
    name: String, 
    email: String,
    totalOrders: { type: Number, default: 0 } // Added for business logic example
});
const User = mongoose.model('User', UserSchema);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('User-DB Connected'))
  .catch(err => console.error('Mongo Connection Error:', err));

// RabbitMQ Consumer Logic
async function startConsumer() {
  await rabbitmq.connect();

  // FIX: Added 'async' to the callback function
  rabbitmq.consume('order_created', async (orderData) => {
    console.log(`--- Processing Order #${orderData._id} ---`);
    
    try {
        // Real Business Logic Example: Increment order count for the user
        await User.findByIdAndUpdate(orderData.userId, { $inc: { totalOrders: 1 } });
        console.log(`Successfully updated profile for User: ${orderData.userId}`);
    } catch (err) {
        console.error('Failed to process order in consumer:', err);
        // Note: In a real app, you might NOT 'ack' the message here so it retries
    }
  });
}

startConsumer();

// Routes
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log('User Service running on port 3001');
});