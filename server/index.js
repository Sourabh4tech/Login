const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const cors=require('cors');

const app = express();
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/admindata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User Model
const User = mongoose.model('admin-data', {
  username: String,
  password: String,
});

// Middleware
app.use(bodyParser.json());

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    

    
    if(password===user.password){

    const token = jwt.sign({ userId: user._id}, 'secret_key123', { expiresIn: '1h' });

    res.json({ token });}
    else{
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
