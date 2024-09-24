const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');  // Adjusted path to db.js in config
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Sample Route
app.get('/', (req, res) => {
  res.send('Academic Management Platform Backend is running');
});

// Import routes
const studentRoutes = require('./routes/studentRoutes'); // Adjusted path
app.use('/api', studentRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
