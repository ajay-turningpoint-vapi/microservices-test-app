const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('User-DB Connected'))
  .catch(err => console.error(err));

// Schema
const UserSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', UserSchema);

// Routes
app.post('/register', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

app.listen(3001, () => {
    console.log('User Service running on port 3001');
});